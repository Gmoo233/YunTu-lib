import { useState } from 'react'
import { MapContainer, ImageOverlay, Marker, Popup, Rectangle } from 'react-leaflet'
import L from 'leaflet'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const FloorPlan = () => {
  const [currentFloor, setCurrentFloor] = useState(1)
  const [selectedSeat, setSelectedSeat] = useState<any>(null)

  const floorPlans: Record<number, string> = {
    1: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=library%20first%20floor%20plan%20with%20chinese%20circulation%20stack%20area%20on%20left%2C%20entrance%20with%20access%20control%20system%2C%20multiple%20offices%20on%20right%2C%20stairs%20and%20restrooms%2C%20detailed%20layout%20of%20Hulunbuir%20College%20library%20first%20floor&size=1024x1024',
    2: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=library%20second%20floor%20plan%20with%20teacher%20reading%20area%20on%20left%2C%20foreign%20language%20literature%20reading%20area%2C%20shared%20hall%2C%20consultation%20service%20desk%2C%20function%20area%2C%20minority%20literature%20room%2C%20self-study%20area%2C%20detailed%20layout%20of%20Hulunbuir%20College%20library%20second%20floor&size=1024x1024',
    3: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=library%20third%20floor%20plan%20with%20mongolian%20circulation%20stack%20and%20reading%20area%20on%20left%2C%20autonomous%20study%20area%20I%2C%20electronic%20reading%20area%2C%20lecture%20hall%2C%20warehouse%2C%20detailed%20layout%20of%20Hulunbuir%20College%20library%20third%20floor&size=1024x1024',
    4: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=library%20fourth%20floor%20plan%20with%20autonomous%20study%20area%20II%20on%20left%2C%20social%20sciences%20literature%20reading%20area%2C%20academic%20lecture%20hall%2C%20library%20data%20center%2C%20warehouse%2C%20detailed%20layout%20of%20Hulunbuir%20College%20library%20fourth%20floor&size=1024x1024',
    5: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=library%20fifth%20floor%20plan%20with%20comprehensive%20literature%20library%2C%20director%27s%20office%2C%20general%20office%2C%20secretary%27s%20office%2C%20deputy%20director%27s%20office%2C%20foreign%20language%20circulation%20stack%2C%20natural%20sciences%20reading%20area%2C%20academic%20lecture%20hall%2C%20art%20college%20photography%20studio%2C%20chinese%20special%20collection%20room%2C%20detailed%20layout%20of%20Hulunbuir%20College%20library%20fifth%20floor&size=1024x1024'
  }

  const floorBounds: [[number, number], [number, number]] = [
    [0, 0],
    [800, 600]
  ]

  const seats: Record<number, Array<{
    id: number
    position: [number, number]
    status: 'available' | 'occupied' | 'reserved'
    type: 'single' | 'group'
  }>> = {
    1: [
      // 中文借阅书库区域（左侧）
      { id: 101, position: [100, 100] as [number, number], status: 'available', type: 'single' },
      { id: 102, position: [150, 100] as [number, number], status: 'occupied', type: 'single' },
      { id: 103, position: [200, 100] as [number, number], status: 'reserved', type: 'single' },
      { id: 104, position: [250, 100] as [number, number], status: 'available', type: 'single' },
      { id: 105, position: [300, 100] as [number, number], status: 'available', type: 'single' },
      { id: 106, position: [350, 100] as [number, number], status: 'occupied', type: 'single' },
      { id: 107, position: [400, 100] as [number, number], status: 'reserved', type: 'single' },
      { id: 108, position: [450, 100] as [number, number], status: 'available', type: 'single' },
      { id: 109, position: [500, 100] as [number, number], status: 'available', type: 'single' },
      { id: 110, position: [550, 100] as [number, number], status: 'occupied', type: 'single' },
      { id: 111, position: [100, 150] as [number, number], status: 'available', type: 'single' },
      { id: 112, position: [150, 150] as [number, number], status: 'occupied', type: 'single' },
      { id: 113, position: [200, 150] as [number, number], status: 'reserved', type: 'single' },
      { id: 114, position: [250, 150] as [number, number], status: 'available', type: 'single' },
      { id: 115, position: [300, 150] as [number, number], status: 'available', type: 'single' },
      { id: 116, position: [350, 150] as [number, number], status: 'occupied', type: 'single' },
      { id: 117, position: [400, 150] as [number, number], status: 'reserved', type: 'single' },
      { id: 118, position: [450, 150] as [number, number], status: 'available', type: 'single' },
      { id: 119, position: [500, 150] as [number, number], status: 'available', type: 'single' },
      { id: 120, position: [550, 150] as [number, number], status: 'occupied', type: 'single' },
      // 中文借阅书库中间区域
      { id: 121, position: [150, 200] as [number, number], status: 'available', type: 'group' },
      { id: 122, position: [250, 200] as [number, number], status: 'available', type: 'group' },
      { id: 123, position: [350, 200] as [number, number], status: 'occupied', type: 'group' },
      { id: 124, position: [450, 200] as [number, number], status: 'reserved', type: 'group' },
      { id: 125, position: [550, 200] as [number, number], status: 'available', type: 'group' },
      // 中文借阅书库右侧区域
      { id: 126, position: [100, 250] as [number, number], status: 'available', type: 'single' },
      { id: 127, position: [150, 250] as [number, number], status: 'occupied', type: 'single' },
      { id: 128, position: [200, 250] as [number, number], status: 'reserved', type: 'single' },
      { id: 129, position: [250, 250] as [number, number], status: 'available', type: 'single' },
      { id: 130, position: [300, 250] as [number, number], status: 'available', type: 'single' },
      { id: 131, position: [350, 250] as [number, number], status: 'occupied', type: 'single' },
      { id: 132, position: [400, 250] as [number, number], status: 'reserved', type: 'single' },
      { id: 133, position: [450, 250] as [number, number], status: 'available', type: 'single' },
      { id: 134, position: [500, 250] as [number, number], status: 'available', type: 'single' },
      { id: 135, position: [550, 250] as [number, number], status: 'occupied', type: 'single' },
      // 入口附近区域
      { id: 136, position: [300, 350] as [number, number], status: 'available', type: 'single' },
      { id: 137, position: [350, 350] as [number, number], status: 'occupied', type: 'single' },
      { id: 138, position: [400, 350] as [number, number], status: 'reserved', type: 'single' },
      { id: 139, position: [450, 350] as [number, number], status: 'available', type: 'single' },
      { id: 140, position: [300, 400] as [number, number], status: 'available', type: 'group' },
      { id: 141, position: [400, 400] as [number, number], status: 'available', type: 'group' },
    ],
    2: [
      // 教师阅览区
      { id: 201, position: [150, 100] as [number, number], status: 'available', type: 'single' },
      { id: 202, position: [200, 100] as [number, number], status: 'occupied', type: 'single' },
      { id: 203, position: [250, 100] as [number, number], status: 'reserved', type: 'single' },
      { id: 204, position: [300, 100] as [number, number], status: 'available', type: 'single' },
      { id: 205, position: [350, 100] as [number, number], status: 'available', type: 'single' },
      { id: 206, position: [150, 150] as [number, number], status: 'occupied', type: 'single' },
      { id: 207, position: [200, 150] as [number, number], status: 'reserved', type: 'single' },
      { id: 208, position: [250, 150] as [number, number], status: 'available', type: 'single' },
      { id: 209, position: [300, 150] as [number, number], status: 'available', type: 'single' },
      { id: 210, position: [350, 150] as [number, number], status: 'occupied', type: 'single' },
      // 外语文献阅览区
      { id: 211, position: [450, 100] as [number, number], status: 'available', type: 'single' },
      { id: 212, position: [500, 100] as [number, number], status: 'occupied', type: 'single' },
      { id: 213, position: [450, 150] as [number, number], status: 'reserved', type: 'single' },
      { id: 214, position: [500, 150] as [number, number], status: 'available', type: 'single' },
      // 共享大厅附近
      { id: 215, position: [250, 250] as [number, number], status: 'available', type: 'group' },
      { id: 216, position: [350, 250] as [number, number], status: 'available', type: 'group' },
      { id: 217, position: [450, 250] as [number, number], status: 'occupied', type: 'group' },
      // 自习区
      { id: 218, position: [600, 250] as [number, number], status: 'available', type: 'single' },
      { id: 219, position: [650, 250] as [number, number], status: 'occupied', type: 'single' },
      { id: 220, position: [700, 250] as [number, number], status: 'reserved', type: 'single' },
      { id: 221, position: [600, 300] as [number, number], status: 'available', type: 'single' },
      { id: 222, position: [650, 300] as [number, number], status: 'occupied', type: 'single' },
      { id: 223, position: [700, 300] as [number, number], status: 'reserved', type: 'single' }
    ],
    3: [
      // 蒙文借阅书库及阅览区
      { id: 301, position: [100, 100] as [number, number], status: 'available', type: 'single' },
      { id: 302, position: [150, 100] as [number, number], status: 'occupied', type: 'single' },
      { id: 303, position: [100, 150] as [number, number], status: 'reserved', type: 'single' },
      { id: 304, position: [150, 150] as [number, number], status: 'available', type: 'single' },
      // 自主研习区（I）
      { id: 305, position: [350, 100] as [number, number], status: 'available', type: 'single' },
      { id: 306, position: [400, 100] as [number, number], status: 'occupied', type: 'single' },
      { id: 307, position: [450, 100] as [number, number], status: 'reserved', type: 'single' },
      { id: 308, position: [500, 100] as [number, number], status: 'available', type: 'single' },
      { id: 309, position: [550, 100] as [number, number], status: 'available', type: 'single' },
      { id: 310, position: [350, 150] as [number, number], status: 'occupied', type: 'single' },
      { id: 311, position: [400, 150] as [number, number], status: 'reserved', type: 'single' },
      { id: 312, position: [450, 150] as [number, number], status: 'available', type: 'single' },
      { id: 313, position: [500, 150] as [number, number], status: 'available', type: 'single' },
      { id: 314, position: [550, 150] as [number, number], status: 'occupied', type: 'single' },
      // 电子阅览区
      { id: 315, position: [350, 250] as [number, number], status: 'available', type: 'group' },
      { id: 316, position: [450, 250] as [number, number], status: 'available', type: 'group' },
      { id: 317, position: [550, 250] as [number, number], status: 'occupied', type: 'group' },
      { id: 318, position: [350, 300] as [number, number], status: 'reserved', type: 'group' },
      { id: 319, position: [450, 300] as [number, number], status: 'available', type: 'group' },
      { id: 320, position: [550, 300] as [number, number], status: 'available', type: 'group' }
    ],
    4: [
      // 自主研习区（II）
      { id: 401, position: [100, 100] as [number, number], status: 'available', type: 'single' },
      { id: 402, position: [150, 100] as [number, number], status: 'occupied', type: 'single' },
      { id: 403, position: [100, 150] as [number, number], status: 'reserved', type: 'single' },
      { id: 404, position: [150, 150] as [number, number], status: 'available', type: 'single' },
      { id: 405, position: [100, 200] as [number, number], status: 'available', type: 'single' },
      { id: 406, position: [150, 200] as [number, number], status: 'occupied', type: 'single' },
      // 社科文献阅览区
      { id: 407, position: [350, 100] as [number, number], status: 'available', type: 'single' },
      { id: 408, position: [400, 100] as [number, number], status: 'occupied', type: 'single' },
      { id: 409, position: [450, 100] as [number, number], status: 'reserved', type: 'single' },
      { id: 410, position: [500, 100] as [number, number], status: 'available', type: 'single' },
      { id: 411, position: [550, 100] as [number, number], status: 'available', type: 'single' },
      { id: 412, position: [350, 150] as [number, number], status: 'occupied', type: 'single' },
      { id: 413, position: [400, 150] as [number, number], status: 'reserved', type: 'single' },
      { id: 414, position: [450, 150] as [number, number], status: 'available', type: 'single' },
      { id: 415, position: [500, 150] as [number, number], status: 'available', type: 'single' },
      { id: 416, position: [550, 150] as [number, number], status: 'occupied', type: 'single' },
      // 学术报告厅附近
      { id: 417, position: [350, 250] as [number, number], status: 'available', type: 'group' },
      { id: 418, position: [450, 250] as [number, number], status: 'available', type: 'group' },
      { id: 419, position: [550, 250] as [number, number], status: 'occupied', type: 'group' }
    ],
    5: [
      // 自然科学阅览区
      { id: 501, position: [350, 100] as [number, number], status: 'available', type: 'single' },
      { id: 502, position: [400, 100] as [number, number], status: 'occupied', type: 'single' },
      { id: 503, position: [450, 100] as [number, number], status: 'reserved', type: 'single' },
      { id: 504, position: [500, 100] as [number, number], status: 'available', type: 'single' },
      { id: 505, position: [550, 100] as [number, number], status: 'available', type: 'single' },
      { id: 506, position: [350, 150] as [number, number], status: 'occupied', type: 'single' },
      { id: 507, position: [400, 150] as [number, number], status: 'reserved', type: 'single' },
      { id: 508, position: [450, 150] as [number, number], status: 'available', type: 'single' },
      { id: 509, position: [500, 150] as [number, number], status: 'available', type: 'single' },
      { id: 510, position: [550, 150] as [number, number], status: 'occupied', type: 'single' },
      // 学术报告厅附近
      { id: 511, position: [350, 250] as [number, number], status: 'available', type: 'group' },
      { id: 512, position: [450, 250] as [number, number], status: 'available', type: 'group' },
      { id: 513, position: [550, 250] as [number, number], status: 'occupied', type: 'group' },
      // 综合文库附近
      { id: 514, position: [100, 100] as [number, number], status: 'available', type: 'single' },
      { id: 515, position: [150, 100] as [number, number], status: 'occupied', type: 'single' },
      { id: 516, position: [100, 150] as [number, number], status: 'reserved', type: 'single' },
      { id: 517, position: [150, 150] as [number, number], status: 'available', type: 'single' }
    ]
  }

  const zones = [
    { id: 1, bounds: [[80, 80] as [number, number], [600, 300] as [number, number]], name: '中文借阅书库', color: '#3b82f6' },
    { id: 2, bounds: [[280, 320] as [number, number], [480, 450] as [number, number]], name: '入口区域', color: '#10b981' },
    { id: 3, bounds: [[620, 80] as [number, number], [750, 400] as [number, number]], name: '办公区域', color: '#f59e0b' },
    { id: 4, bounds: [[620, 420] as [number, number], [750, 550] as [number, number]], name: '楼梯与卫生间', color: '#8b5cf6' }
  ]

  const getSeatStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500'
      case 'occupied': return 'bg-red-500'
      case 'reserved': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getSeatStatusText = (status: string) => {
    switch (status) {
      case 'available': return '空闲'
      case 'occupied': return '占用'
      case 'reserved': return '预约'
      default: return '未知'
    }
  }

  const getSeatTypeText = (type: string) => {
    return type === 'single' ? '单人座' : '多人座'
  }

  const handleSeatClick = (seat: any) => {
    setSelectedSeat(seat)
  }

  const handleReserveSeat = (seatId: number) => {
    // 这里可以添加预约逻辑
    alert(`预约座位 ${seatId} 成功！`)
    setSelectedSeat(null)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>楼层平面图</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(floor => (
              <Button
                key={floor}
                size="sm"
                variant={currentFloor === floor ? 'default' : 'outline'}
                onClick={() => setCurrentFloor(floor)}
              >
                {floor}楼
              </Button>
            ))}
          </div>
        </CardTitle>
        <CardDescription>
          点击座位查看详情，绿色表示空闲，红色表示占用，黄色表示已预约
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-96 w-full [&_.leaflet-container]:z-0">
          <MapContainer
            center={[400, 300]}
            zoom={1}
            maxZoom={3}
            minZoom={1}
            crs={L.CRS.Simple}
            className="h-full w-full"
          >
            <ImageOverlay
              url={floorPlans[currentFloor]}
              bounds={floorBounds}
            />

            {zones.map(zone => (
              <Rectangle
                key={zone.id}
                bounds={zone.bounds}
                pathOptions={{
                  color: zone.color,
                  weight: 2,
                  fillOpacity: 0.2
                }}
              >
                <Popup>{zone.name}</Popup>
              </Rectangle>
            ))}

            {seats[currentFloor as keyof typeof seats].map(seat => (
              <Marker
                key={seat.id}
                position={seat.position}
                icon={L.divIcon({
                  className: `seat-marker ${seat.status}`,
                  html: `<div class="w-4 h-4 rounded-full ${getSeatStatusColor(seat.status)}"></div>`,
                  iconSize: [16, 16]
                })}
                eventHandlers={{
                  click: () => handleSeatClick(seat)
                }}
              >
                <Popup>
                  <div className="space-y-2 min-w-[150px]">
                    <p className="font-medium">座位号: {seat.id}</p>
                    <p>状态: {getSeatStatusText(seat.status)}</p>
                    <p>类型: {getSeatTypeText(seat.type)}</p>
                    {seat.status === 'available' && (
                      <Button 
                        size="sm" 
                        className="w-full" 
                        onClick={() => handleReserveSeat(seat.id)}
                      >
                        预约此座位
                      </Button>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
      {selectedSeat && (
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">座位详情</h4>
              <p className="text-sm text-muted-foreground">
                座位号: {selectedSeat.id} | 状态: {getSeatStatusText(selectedSeat.status)} | 类型: {getSeatTypeText(selectedSeat.type)}
              </p>
            </div>
            {selectedSeat.status === 'available' && (
              <Button 
                size="sm" 
                onClick={() => handleReserveSeat(selectedSeat.id)}
              >
                预约座位
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}

export default FloorPlan

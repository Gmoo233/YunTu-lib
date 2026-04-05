import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import QRCode from 'qrcode'
import { Clock, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { mockSeatZones } from '@/lib/mock/data'
import { cn } from '@/lib/utils'
import FloorPlan from '@/components/floor-plan/FloorPlan'



const slotPresets = ['30 分钟', '1 小时', '半天']

export function SeatsPage() {
  const chartRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<HTMLCanvasElement>(null)
  const [slot, setSlot] = useState(slotPresets[1])

  useEffect(() => {
    const el = chartRef.current
    if (!el) return
    const chart = echarts.init(el)
    const categories = mockSeatZones.map((z) => z.name)
    const occupied = mockSeatZones.map((z) => z.total - z.free)
    const free = mockSeatZones.map((z) => z.free)
    chart.setOption({
      color: ['#f59e0b', '#10b981'],
      tooltip: { trigger: 'axis' },
      legend: { data: ['已占', '空闲'] },
      grid: { left: 48, right: 16, bottom: 32, top: 32 },
      xAxis: { type: 'category', data: categories },
      yAxis: { type: 'value', name: '座位数' },
      series: [
        { name: '已占', type: 'bar', stack: 'total', data: occupied },
        { name: '空闲', type: 'bar', stack: 'total', data: free },
      ],
    })
    const ro = new ResizeObserver(() => chart.resize())
    ro.observe(el)
    return () => {
      ro.disconnect()
      chart.dispose()
    }
  }, [])

  useEffect(() => {
    const canvas = qrRef.current
    if (!canvas) return
    void QRCode.toCanvas(canvas, 'https://library.example/seats/checkin/demo', {
      width: 160,
      margin: 1,
    })
  }, [])

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">智能座位管理</h1>
        <p className="text-muted-foreground">
          区域热力（绿/橙/红逻辑可对接到 WebSocket 实时推送）、时段预约与扫码签到（演示）。
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>区域占用分布</CardTitle>
            <CardDescription>ECharts 堆叠柱状图示意；全量热力可切换为矩阵热力图。</CardDescription>
          </CardHeader>
          <CardContent>
            <div ref={chartRef} className="h-72 w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              扫码签到
            </CardTitle>
            <CardDescription>现场扫描座位二维码完成签到；超时释放与占座预警由后端调度。</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <canvas ref={qrRef} className="rounded-md border border-border bg-white" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>签到会话与设备绑定；离座超 30 分钟未续时自动释放（规则可配置）。</p>
              <Button size="sm" variant="outline">
                模拟签到成功
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            预约时段
          </CardTitle>
          <CardDescription>粒度：30 分钟 / 1 小时 / 半天；开始前 15 分钟可取消。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {slotPresets.map((s) => (
              <Button
                key={s}
                type="button"
                size="sm"
                variant={slot === s ? 'default' : 'outline'}
                onClick={() => setSlot(s)}
              >
                {s}
              </Button>
            ))}
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>选择区域</Label>
              <div className="flex flex-wrap gap-2">
                {mockSeatZones.map((z) => (
                  <span
                    key={z.id}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs',
                      z.level === 'high' && 'border-red-200 bg-red-50 text-red-800',
                      z.level === 'mid' && 'border-amber-200 bg-amber-50 text-amber-900',
                      z.level === 'low' && 'border-emerald-200 bg-emerald-50 text-emerald-900',
                    )}
                  >
                    {z.name} 空 {z.free}/{z.total}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-end">
              <Button className="w-full sm:w-auto">提交预约（{slot}）</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <FloorPlan />
    </div>
  )
}

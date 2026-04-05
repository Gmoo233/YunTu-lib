import { Link } from 'react-router-dom'
import { Accessibility, CalendarRange, Glasses, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const items = [
  {
    title: '学习空间规划',
    desc: '根据课表与学习目标推荐每日学习时段与座位区域（分期接入画像与推荐服务）。',
    icon: CalendarRange,
  },
  {
    title: '沉浸式阅读',
    desc: 'VR/AR 主题阅读空间、古籍复原与场景化导读（预留扩展点与内容协议）。',
    icon: Glasses,
  },
  {
    title: '学术协作',
    desc: '文献批注、小组共读与在线研讨（与资源域、账号体系打通）。',
    icon: Users,
  },
  {
    title: '无障碍服务',
    desc: '语音导航、文字转语音与对比度主题（符合无障碍设计规范）。',
    icon: Accessibility,
  },
]

export function InnovationPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">创新拓展</h1>
        <p className="text-muted-foreground">
          分期交付：此处先预留路由与能力说明，避免仅实现借阅 CRUD。
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(({ title, desc, icon: Icon }) => (
          <Card key={title}>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile">关联个人画像与设置</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockNotifications } from '@/lib/mock/data'

const catLabel: Record<string, string> = {
  borrow: '借阅',
  resource: '资源',
  event: '活动',
  system: '系统',
}

export function NotificationsPage() {
  const by = (c: string) => mockNotifications.filter((n) => n.category === c)

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">智能消息通知</h1>
        <p className="text-muted-foreground">
          借阅 / 资源 / 活动 / 系统分类；兴趣匹配与勿扰模式在个人中心设置。
        </p>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="borrow">借阅</TabsTrigger>
          <TabsTrigger value="resource">资源</TabsTrigger>
          <TabsTrigger value="event">活动</TabsTrigger>
          <TabsTrigger value="system">系统</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-3">
          {mockNotifications.map((n) => (
            <Card key={n.id} className={n.read ? 'opacity-80' : ''}>
              <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Bell className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base">{n.title}</CardTitle>
                    <Badge variant="outline">{catLabel[n.category]}</Badge>
                    {!n.read ? <Badge>未读</Badge> : null}
                  </div>
                  <CardDescription>{n.time}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{n.body}</CardContent>
            </Card>
          ))}
        </TabsContent>
        {(['borrow', 'resource', 'event', 'system'] as const).map((c) => (
          <TabsContent key={c} value={c} className="space-y-3">
            {by(c).length ? (
              by(c).map((n) => (
                <Card key={n.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{n.title}</CardTitle>
                    <CardDescription>{n.time}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{n.body}</CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">暂无此类消息</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

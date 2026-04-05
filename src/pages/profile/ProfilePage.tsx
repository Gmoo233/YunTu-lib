import { Link } from 'react-router-dom'
import { BarChart3, BookMarked, Headphones, MessageSquare, Settings } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'

export function ProfilePage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">个人中心</h1>
        <p className="text-muted-foreground">
          资料与隐私、服务记录、阅读与学习数据、推送与安全设置。
        </p>
      </div>

      {!user ? (
        <Card>
          <CardHeader>
            <CardTitle>登录后查看</CardTitle>
            <CardDescription>借阅 / 预约 / 咨询 / 通知将关联学号或工号。</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/login">去登录</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>
              学号/工号 {user.studentNo} · 角色 {user.role}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" defaultValue={user.email ?? ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">手机（可选）</Label>
              <Input id="phone" placeholder="用于到馆提醒" />
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="records">
        <TabsList className="flex h-auto flex-wrap">
          <TabsTrigger value="records">
            <BookMarked className="mr-1 h-4 w-4" />
            服务记录
          </TabsTrigger>
          <TabsTrigger value="stats">
            <BarChart3 className="mr-1 h-4 w-4" />
            数据报告
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-1 h-4 w-4" />
            设置
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">借阅 / 预约 / 咨询</CardTitle>
              <CardDescription>多源聚合查询（演示占位）</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <BookMarked className="h-4 w-4" />
                最近借阅：《深度学习》 — 应还 2026-04-20
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                座位预约：4F 静音区 · 明天 14:00–16:00
              </p>
              <p className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                咨询记录：数据库访问权限 — 已解决
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">阅读与学习数据</CardTitle>
              <CardDescription>阅读时长、时段分布、资源偏好；可导出学习报告。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: '本周阅读', value: '6.5 h' },
                  { label: '最常时段', value: '20:00–22:00' },
                  { label: '偏好分类', value: '计算机' },
                ].map((x) => (
                  <div key={x.label} className="rounded-lg border border-border p-4">
                    <div className="text-xs text-muted-foreground">{x.label}</div>
                    <div className="text-lg font-semibold">{x.value}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                对接后端统计服务后，此处替换为 ECharts 可视化与趋势对比。
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">推送与勿扰</CardTitle>
              <CardDescription>匹配讲座/读书会/展览；支持自定义勿扰时段。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="push">借阅与预约提醒</Label>
                <Switch id="push" defaultChecked />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="dnd">勿扰模式（22:00–08:00）</Label>
                <Switch id="dnd" />
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="sec">账号安全（双因素占位）</Label>
                <Button id="sec" size="sm" variant="outline">
                  管理
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

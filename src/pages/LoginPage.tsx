import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Library } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/authStore'

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const [studentNo, setStudentNo] = useState('20260001')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('演示用户')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({
      user: {
        id: 'u-demo',
        name: name || '读者',
        studentNo,
        role: 'reader',
        email: `${studentNo}@campus.edu.cn`,
      },
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    })
    navigate('/profile', { replace: true })
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-2">
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Library className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold">登录云图图书馆</h1>
        <p className="text-sm text-muted-foreground">
          前端演示：任意密码可登录。对接后端后将改为 JWT + Refresh Token。
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>账号登录</CardTitle>
          <CardDescription>绑定学号/工号，与个人中心、借阅与通知关联。</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">显示姓名</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentNo">学号 / 工号</Label>
              <Input
                id="studentNo"
                value={studentNo}
                onChange={(e) => setStudentNo(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="演示环境可留空"
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full">
              登录
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link to="/" className="text-primary hover:underline">
          返回首页
        </Link>
      </p>
    </div>
  )
}

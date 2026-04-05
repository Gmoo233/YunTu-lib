import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Bot,
  Compass,
  GraduationCap,
  LayoutGrid,
  Library,
  LogIn,
  LogOut,
  Menu,
  MessageSquare,
  Sparkles,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/authStore'

const nav = [
  { to: '/', label: '首页', icon: LayoutGrid },
  { to: '/books', label: '智能找书', icon: BookOpen },
  { to: '/resources', label: '资源服务', icon: Library },
  { to: '/seats', label: '座位管理', icon: Compass },
  { to: '/ai', label: 'AI 咨询', icon: Bot },
  { to: '/notifications', label: '消息通知', icon: MessageSquare },
  { to: '/innovation', label: '创新拓展', icon: Sparkles },
  { to: '/universities', label: '高校直达', icon: GraduationCap },
  { to: '/profile', label: '个人中心', icon: User },
]

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 p-2 md:p-0">
      {nav.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            ].join(' ')
          }
        >
          <Icon className="h-4 w-4 shrink-0" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh flex flex-col md:flex-row bg-background">
      <aside className="hidden w-56 shrink-0 border-r border-border bg-card/50 md:flex md:flex-col md:sticky md:top-0 md:h-dvh">
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Library className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">云图</div>
            <div className="text-[10px] text-muted-foreground">智慧图书馆</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-3">
          <NavItems />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="打开菜单"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Library className="h-4 w-4" />
            </div>
            <span className="font-semibold">云图图书馆</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/15 text-primary text-xs">
                        {user.name.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden max-w-[8rem] truncate text-sm sm:inline">
                      {user.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>
                    <div className="text-xs font-normal text-muted-foreground">
                      {user.studentNo}
                    </div>
                    <div className="truncate">{user.name}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    个人中心
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      logout()
                      navigate('/login')
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  登录
                </Link>
              </Button>
            )}
          </div>
        </header>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="关闭菜单"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-r border-border bg-background shadow-xl">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <Library className="h-5 w-5 text-primary" />
                <span className="font-semibold">导航</span>
              </div>
              <div className="flex-1 overflow-y-auto py-2">
                <NavItems onNavigate={() => setMobileOpen(false)} />
              </div>
            </div>
          </div>
        ) : null}

        <motion.main
          className="flex-1 p-4 md:p-8"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}

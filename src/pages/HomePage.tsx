import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Bot,
  Compass,
  GraduationCap,
  Library,
  MessageSquare,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const tiles = [
  {
    to: '/books',
    title: '智能找书',
    desc: '架位、在架状态、到馆提醒与文献聚合',
    icon: BookOpen,
  },
  {
    to: '/resources',
    title: '资源服务',
    desc: '主题书单、导读摘要与为你精选',
    icon: Library,
  },
  {
    to: '/seats',
    title: '座位管理',
    desc: '热力图、预约时段与扫码签到',
    icon: Compass,
  },
  {
    to: '/ai',
    title: 'AI 咨询',
    desc: '7×24 问答、知识库与转人工',
    icon: Bot,
  },
  {
    to: '/notifications',
    title: '消息通知',
    desc: '分类推送、兴趣匹配与勿扰',
    icon: MessageSquare,
  },
  {
    to: '/innovation',
    title: '创新拓展',
    desc: '学习空间、沉浸式阅读与协作',
    icon: Sparkles,
  },
  {
    to: '/universities',
    title: '高校直达',
    desc: '内蒙古高校图书馆与学术平台',
    icon: GraduationCap,
  },
]

export function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 md:p-12">
        <div className="relative z-10 max-w-2xl space-y-4">
          <p className="text-sm font-medium text-primary">云图智慧图书馆</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            找书高效 · 资源激活 · 座位有序 · 咨询即时
          </h1>
          <p className="text-muted-foreground">
            一站式高校智慧服务：检索与架位、数据库与书单、座位热力与预约、AI
            咨询与消息中心，按《云图设计文档》七大业务域完整落地。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/books">
                开始找书
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/profile">个人中心</Link>
            </Button>
          </div>
        </div>
        <motion.div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
          aria-hidden
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(({ to, title, desc, icon: Icon }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={to} className="block h-full">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base">{title}</CardTitle>
                    <CardDescription>{desc}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <span className="text-sm font-medium text-primary">进入</span>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

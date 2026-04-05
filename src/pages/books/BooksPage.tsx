import { useMemo, useState } from 'react'
import { Bell, MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockAggregated, mockBooks, type BookItem } from '@/lib/mock/data'

export function BooksPage() {
  const [q, setQ] = useState('')
  const [detail, setDetail] = useState<BookItem | null>(null)

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return mockBooks
    return mockBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(s) ||
        b.author.toLowerCase().includes(s) ||
        b.isbn.includes(s),
    )
  }, [q])

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">智能找书</h1>
        <p className="text-muted-foreground">
          书名/作者/ISBN 检索；架位与在架状态；到馆提醒与多源文献（演示数据）。
        </p>
      </div>

      <Tabs defaultValue="catalog" className="w-full">
        <TabsList>
          <TabsTrigger value="catalog">馆藏检索</TabsTrigger>
          <TabsTrigger value="aggregate">文献聚合</TabsTrigger>
          <TabsTrigger value="thirdparty">第三方平台</TabsTrigger>
        </TabsList>
        <TabsContent value="catalog" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="搜索书名、作者、ISBN…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-3">
            {filtered.map((b) => (
              <Card key={b.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                  <div
                    className={`h-16 w-12 shrink-0 rounded-md bg-gradient-to-br ${b.coverColor}`}
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <CardTitle className="text-lg leading-snug">{b.title}</CardTitle>
                    <CardDescription>
                      {b.author} · ISBN {b.isbn}
                    </CardDescription>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <Badge variant="outline" className="gap-1">
                        <MapPin className="h-3 w-3" />
                        {b.floor} {b.shelf}
                      </Badge>
                      {b.status === 'available' ? (
                        <Badge variant="success">在架</Badge>
                      ) : (
                        <Badge variant="warning">借出</Badge>
                      )}
                      {b.status === 'borrowed' && b.returnDate ? (
                        <span className="text-xs text-muted-foreground">
                          预计归还 {b.returnDate}
                        </span>
                      ) : null}
                      {b.queue > 0 ? (
                        <span className="text-xs text-muted-foreground">
                          预约队列 {b.queue} 人
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <Button variant="outline" size="sm" onClick={() => setDetail(b)}>
                      详情
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Bell className="h-4 w-4" />
                      到馆提醒
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
            {filtered.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">无匹配结果</p>
            ) : null}
          </div>
        </TabsContent>
        <TabsContent value="aggregate" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            聚合本校馆藏、知网、超星等来源；支持文献传递与馆际互借对接（前端占位）。
          </p>
          <div className="grid gap-3">
            {mockAggregated.map((d) => (
              <Card key={d.id}>
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base">{d.title}</CardTitle>
                    <Badge variant="secondary">{d.source}</Badge>
                    <Badge variant="outline">{d.type}</Badge>
                  </div>
                  <CardDescription>{d.year} 年</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={d.link}>查看 / 传递</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="thirdparty" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            第三方学术资源平台搜索入口，提供更广泛的文献检索与获取渠道。
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>CALIS联合目录检索系统</CardTitle>
                <CardDescription>中国高等教育文献保障系统联合目录，提供高校图书馆馆藏资源的联合检索服务。</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full gap-2">
                  <a href="https://opac2.calis.edu.cn/" target="_blank" rel="noopener noreferrer">
                    访问 CALIS
                  </a>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>开世览文(CASHL)</CardTitle>
                <CardDescription>中国高校人文社会科学文献中心，提供人文社科领域的文献资源与服务。</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full gap-2">
                  <a href="https://www.cashl.edu.cn/" target="_blank" rel="noopener noreferrer">
                    访问 CASHL
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{detail?.title}</DialogTitle>
            <DialogDescription>{detail?.author}</DialogDescription>
          </DialogHeader>
          {detail ? (
            <div className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-2">
                <Badge>{detail.floor}</Badge>
                <Badge variant="outline">{detail.shelf}</Badge>
                {detail.status === 'available' ? (
                  <Badge variant="success">在架</Badge>
                ) : (
                  <Badge variant="warning">借出</Badge>
                )}
              </div>
              <Separator />
              <p>
                <span className="text-muted-foreground">ISBN：</span>
                {detail.isbn}
              </p>
              {detail.status === 'borrowed' && detail.returnDate ? (
                <p>
                  <span className="text-muted-foreground">预计归还：</span>
                  {detail.returnDate}
                </p>
              ) : null}
              <p>
                <span className="text-muted-foreground">预约队列：</span>
                {detail.queue} 人
              </p>
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetail(null)}>
              关闭
            </Button>
            <Button>
              <Bell className="h-4 w-4" />
              订阅到馆提醒
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

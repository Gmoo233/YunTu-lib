import { useRef, useState } from 'react'
import { Headphones, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { knowledgeTags } from '@/lib/mock/data'

interface Msg {
  id: string
  role: 'user' | 'assistant'
  text: string
}

const welcome: Msg = {
  id: 'w',
  role: 'assistant',
  text: '您好，我是云图图书馆小助理。可以问我借阅规则、数据库使用、座位预约等问题。需要人工时请点击「转人工」。',
}

export function AiConsultPage() {
  const [messages, setMessages] = useState<Msg[]>([welcome])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const pushAssistant = (text: string) => {
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'assistant', text }])
  }

  const send = () => {
    const t = input.trim()
    if (!t) return
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', text: t }])
    setInput('')
    setTimeout(() => {
      pushAssistant(
        '（演示回复）已记录您的问题。对接 SSE 流式与 RAG 后将在此返回引用片段与结构化答案。',
      )
    }, 400)
    queueMicrotask(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }))
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 lg:flex-row">
      <div className="lg:w-56 shrink-0 space-y-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">知识库标签</CardTitle>
            <CardDescription>高频问题分类（自助检索占位）</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {knowledgeTags.map((t) => (
              <Badge key={t} variant="secondary" className="cursor-pointer">
                {t}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">转人工</CardTitle>
            <CardDescription>文字 / 语音 / 图片由工单系统承接</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full gap-2">
              <Headphones className="h-4 w-4" />
              一键转人工
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="min-h-[28rem] flex-1">
        <CardHeader>
          <CardTitle>AI 智能咨询</CardTitle>
          <CardDescription>
            7×24 多轮对话；后端将使用 SSE 流式输出，MongoDB 存会话，RAG 检索知识库。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ScrollArea className="h-80 rounded-md border border-border p-3">
            <div className="space-y-3 pr-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.role === 'user'
                      ? 'ml-auto max-w-[85%] rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground'
                      : 'mr-auto max-w-[85%] rounded-lg bg-muted px-3 py-2 text-sm'
                  }
                >
                  {m.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入问题，例如：图书续借几次？"
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
              发送
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

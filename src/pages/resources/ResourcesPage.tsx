import { useState } from 'react'
import { Heart, Share2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockResources } from '@/lib/mock/data'

export function ResourcesPage() {
  const [discipline, setDiscipline] = useState('')
  const [grade, setGrade] = useState('')
  const [preference, setPreference] = useState('')

  const disciplines = {
    '哲学': ['哲学理论', '中国哲学', '西方哲学', '逻辑学', '伦理学', '美学', '宗教学'],
    '经济学': ['理论经济学', '应用经济学', '金融学', '国际贸易', '财政学', '统计学', '会计学'],
    '法学': ['法学理论', '宪法学', '行政法学', '刑法学', '民商法学', '诉讼法学', '国际法'],
    '教育学': ['教育学原理', '课程与教学论', '教育史', '比较教育学', '学前教育学', '高等教育学', '特殊教育学'],
    '文学': ['中国语言文学', '外国语言文学', '新闻传播学', '中国古典文献学', '文艺学', '语言学及应用语言学'],
    '历史学': ['中国史', '世界史', '考古学', '历史文献学', '专门史'],
    '理学': ['数学', '物理学', '化学', '生物学', '地理学', '大气科学', '海洋科学', '地球物理学'],
    '工学': ['计算机科学与技术', '软件工程', '电子信息工程', '机械工程', '土木工程', '化学工程', '材料科学与工程'],
    '农学': ['作物学', '园艺学', '植物保护', '农业资源与环境', '畜牧学', '兽医学', '林学'],
    '医学': ['基础医学', '临床医学', '公共卫生与预防医学', '中医学', '中西医结合', '药学', '护理学'],
    '管理学': ['工商管理', '管理科学与工程', '公共管理', '会计学', '市场营销', '人力资源管理', '旅游管理'],
    '艺术学': ['艺术学理论', '音乐与舞蹈学', '戏剧与影视学', '美术学', '设计学', '书法学']
  }

  const grades = {
    '本科': ['一年级', '二年级', '三年级', '四年级'],
    '研究生': ['一年级', '二年级', '三年级'],
    '博士': ['一年级', '二年级', '三年级']
  }

  const preferences = [
    '经典著作', '前沿研究', '实用技能', '考试辅导', '科普读物', '专业教材', '学术论文', '案例分析', '行业报告'
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">智能资源服务</h1>
        <p className="text-muted-foreground">
          主题书单、导读摘要、关键词与思维导图、数据库指南与「为你精选」。
        </p>
      </div>

      <Tabs defaultValue="lists" className="w-full">
        <TabsList className="flex h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="lists">主题书单</TabsTrigger>
          <TabsTrigger value="guide">导读 & 导图</TabsTrigger>
          <TabsTrigger value="picked">为你精选</TabsTrigger>
        </TabsList>

        <TabsContent value="lists" className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <div className="w-full sm:w-auto">
              <Select onValueChange={setDiscipline} value={discipline}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="选择学科" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(disciplines).map((discipline) => (
                    <SelectItem key={discipline} value={discipline}>
                      {discipline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-auto">
              <Select onValueChange={setGrade} value={grade}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="选择年级" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(grades).map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-auto">
              <Select onValueChange={setPreference} value={preference}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="选择偏好" />
                </SelectTrigger>
                <SelectContent>
                  {preferences.map((pref) => (
                    <SelectItem key={pref} value={pref}>
                      {pref}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm">
              应用筛选
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <CardTitle className="text-base">{resource.title}</CardTitle>
                  <CardDescription>{resource.author}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex w-full gap-2">
                    <Button size="sm" variant="secondary" className="flex-1">
                      <Heart className="h-4 w-4" />
                      收藏
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Share2 className="h-4 w-4" />
                      分享
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guide" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>智能导读摘要（演示）</CardTitle>
              <CardDescription>异步生成核心观点、章节摘要与关键词；思维导图可导出。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                本书系统介绍深度学习的数学基础、卷积网络与循环网络，并讨论生成模型与强化学习在实践中的落地要点。
              </p>
              <div className="rounded-lg border border-dashed border-border bg-muted/40 p-4 text-center text-xs">
                思维导图占位 · 对接后端异步任务与 NLP 管线后展示
              </div>
              <div className="flex flex-wrap gap-2">
                {['深度学习', '神经网络', '反向传播', '正则化'].map((k) => (
                  <Badge key={k} variant="secondary">
                    {k}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">数据库使用指南</CardTitle>
              <CardDescription>短视频 / 图文教程入口（占位）</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm">
                观看「知网检索技巧」示例
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="picked" className="space-y-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="flex flex-row items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">今日为你精选</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>热门新书：《大模型应用架构》</p>
              <p>学科前沿：ACL 2026 可读论文清单（占位）</p>
              <p>课程关联：「信息检索」配套阅读 3 本</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

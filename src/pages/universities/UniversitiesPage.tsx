import { ExternalLink, Globe, Library, BookOpen, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const universities = [
  {
    id: 'hlbrc',
    name: '呼伦贝尔学院图书馆',
    url: 'http://lib.hlbrc.cn/',
    description: '呼伦贝尔学院图书馆官方门户，提供馆藏检索、电子资源、读者服务等功能。',
    tags: ['本科院校', '综合类'],
  },
  {
    id: 'cfxy',
    name: '赤峰大学图书馆',
    url: 'https://cfxy.smart.vipslib.com/index#/index',
    description: '赤峰大学图书馆智慧服务平台，技术支持：维普资讯·智图。',
    tags: ['本科院校', '综合类'],
  },
  {
    id: 'imau',
    name: '内蒙古农业大学',
    url: 'https://www.imau.edu.cn/index.htm',
    description: '内蒙古农业大学官方网站，提供学校资讯、教学科研、图书馆等服务入口。',
    tags: ['本科院校', '农林类', '双一流'],
  },
  {
    id: 'imu',
    name: '内蒙古大学',
    url: 'https://www.imu.edu.cn/',
    description: '内蒙古大学官方网站，内蒙古自治区重点综合性大学，国家"双一流"建设高校。',
    tags: ['本科院校', '综合类', '双一流', '211工程'],
  },
  {
    id: 'imust',
    name: '内蒙古科技大学',
    url: 'https://www.imust.edu.cn/',
    description: '内蒙古科技大学官方网站，以冶金、煤炭、稀土为特色的多科性大学。',
    tags: ['本科院校', '理工类'],
  },
  {
    id: 'imnu',
    name: '内蒙古师范大学',
    url: 'https://www.imnu.edu.cn/',
    description: '内蒙古师范大学官方网站，内蒙古自治区重点师范类院校。',
    tags: ['本科院校', '师范类'],
  },
  {
    id: 'imut',
    name: '内蒙古工业大学图书馆',
    url: 'https://lib.imut.edu.cn/index',
    description: '内蒙古工业大学图书馆官方网站，提供馆藏资源、电子数据库、读者服务等功能。',
    tags: ['本科院校', '理工类'],
  },
  {
    id: 'immu',
    name: '内蒙古医科大学图书馆',
    url: 'https://lib.immu.edu.cn/',
    description: '内蒙古医科大学图书馆官方网站，提供医学文献资源、数据库检索、读者服务等功能。',
    tags: ['本科院校', '医药类'],
  },
  {
    id: 'imufe',
    name: '内蒙古财经大学图书馆',
    url: 'https://lib.imufe.edu.cn/',
    description: '内蒙古财经大学图书馆官方网站，提供财经类文献资源、数据库检索、读者服务等功能。',
    tags: ['本科院校', '财经类'],
  },
  {
    id: 'imun',
    name: '内蒙古民族大学图书馆',
    url: 'https://lib.imun.edu.cn/',
    description: '内蒙古民族大学图书馆官方网站，提供馆藏资源、电子数据库、读者服务等功能。',
    tags: ['本科院校', '综合类'],
  },
  {
    id: 'jnnu',
    name: '集宁师范学院图书馆',
    url: 'https://www.jnnu.edu.cn/tsg2/',
    description: '集宁师范学院图书馆官方网站，提供馆藏资源、电子数据库、读者服务等功能。',
    tags: ['本科院校', '师范类'],
  },
  {
    id: 'htxy',
    name: '河套学院图书馆',
    url: 'https://tsghtxy.mh.chaoxing.com/',
    description: '河套学院图书馆智慧服务平台，提供馆藏资源、电子数据库、读者服务等功能。',
    tags: ['本科院校', '综合类'],
  },
  {
    id: 'imnc',
    name: '呼和浩特民族学院图书馆',
    url: 'https://www.imnc.edu.cn/tsg/',
    description: '呼和浩特民族学院图书馆官方网站，提供馆藏资源、电子数据库、读者服务等功能。',
    tags: ['本科院校', '民族类'],
  },
  {
    id: 'imac',
    name: '内蒙古艺术学院图书馆',
    url: 'https://lib.imac.edu.cn/',
    description: '内蒙古艺术学院图书馆官方网站，提供艺术类文献资源、数据库检索、读者服务等功能。',
    tags: ['本科院校', '艺术类'],
  },
  {
    id: 'honder',
    name: '内蒙古鸿德文理学院图书馆',
    url: 'https://honder.com/tsg/index54.html',
    description: '内蒙古鸿德文理学院图书馆官方网站，提供馆藏资源、电子数据库、读者服务等功能。',
    tags: ['本科院校', '综合类'],
  },
  {
    id: 'ordos',
    name: '鄂尔多斯应用技术学院',
    url: 'https://lib.oit.edu.cn/index.htm',
    description: '鄂尔多斯应用技术学院图书馆，提供馆藏资源、电子数据库、读者服务等功能。',
    tags: ['本科院校', '应用型'],
  },
  {
    id: 'police',
    name: '内蒙古警察学院',
    url: 'https://www.impc.edu.cn/tszysy.htm',
    description: '内蒙古警察学院图书馆，提供馆藏资源、电子数据库、读者服务等功能。',
    tags: ['本科院校', '政法类'],
  },
  {
    id: 'hhhtvc',
    name: '呼和浩特职业技术大学',
    url: 'https://www.hhvc.edu.cn/tsg/',
    description: '呼和浩特职业技术大学图书馆，提供馆藏资源、电子数据库、读者服务等功能。',
    tags: ['职业院校', '综合类'],
  },
  {
    id: 'imcvtu',
    name: '内蒙古建筑职业技术大学',
    url: 'https://library.imaa.edu.cn/index',
    description: '内蒙古建筑职业技术大学图书馆，提供馆藏资源、电子数据库、读者服务等功能。',
    tags: ['职业院校', '建筑类'],
  },
  {
    id: 'xavtu',
    name: '兴安职业技术大学',
    url: 'https://www.nmxzy.cn/xasywtsgw/list.htm',
    description: '兴安职业技术大学图书馆，提供馆藏资源、电子数据库、读者服务等功能。',
    tags: ['职业院校', '综合类'],
  },
]

const academicPlatforms = [
  {
    id: 'cnki',
    name: '中国知网',
    url: 'https://www.cnki.net/',
    description: '中国知网（CNKI）是全球最大的中文数据库，提供学术期刊、学位论文、会议论文等资源检索与下载服务。',
    tags: ['核心数据库', '学术期刊', '学位论文'],
    icon: BookOpen,
  },
  {
    id: 'wanfang',
    name: '万方数据知识服务平台',
    url: 'https://www.wanfangdata.com.cn/index.html',
    description: '万方数据知识服务平台，提供科研学习全流程支持服务，涵盖期刊、学位论文、会议论文、专利等资源。',
    tags: ['核心数据库', '学术期刊', '专利标准'],
    icon: Globe,
  },
  {
    id: 'cqvip',
    name: '维普资讯',
    url: 'https://www.cqvip.com/',
    description: '维普资讯中文期刊服务平台，提供中文科技期刊文献检索与全文下载服务。',
    tags: ['核心数据库', '学术期刊'],
    icon: Library,
  },
  {
    id: 'superstar',
    name: '超星电子书',
    url: 'https://www.chaoxing.com/',
    description: '超星数字图书馆，提供海量电子图书在线阅读与下载服务。',
    tags: ['电子图书', '学习平台'],
    icon: BookOpen,
  },
  {
    id: 'sciencechina',
    name: '中国科学文献服务系统',
    url: 'http://sciencechina.cn/',
    description: '中国科学引文数据库(CSCD)提供自然科学领域一千余种中国出版的优秀学术期刊文献中英双语信息、强大的检索和分析功能、快捷的全文链接。',
    tags: ['核心数据库', '自然科学', '引文分析'],
    icon: Globe,
  },
  {
    id: 'sslibrary',
    name: '超星汇雅电子书',
    url: 'https://www.sslibrary.com/entry/page/239443/show',
    description: '超星汇雅电子书平台，提供马列主义、哲学、社会科学、自然科学、工程技术、医药卫生等各个学科领域的电子图书资源。',
    tags: ['电子图书', '综合学科', '学习平台'],
    icon: BookOpen,
  },
  {
    id: 'tsinghua',
    name: '清华大学学者库',
    url: 'https://thurid.lib.tsinghua.edu.cn/',
    description: '清华大学学者库，汇聚清华大学学者的学术成果，包括发表在Science、Nature、Cell等顶级期刊的研究论文。',
    tags: ['学术资源', '高校学者', '科研成果'],
    icon: GraduationCap,
  },
  {
    id: 'yjsexam',
    name: '起点考研网',
    url: 'https://www.yjsexam.com/',
    description: '起点考研网，提供智能批改、考研新课堂、热门专业课程、考研名师指导等考研备考资源和服务。',
    tags: ['考研资源', '考试辅导', '学习平台'],
    icon: BookOpen,
  },
  {
    id: 'opensign',
    name: '公益性学术资源服务平台',
    url: 'https://opensign.lib.tsinghua.edu.cn/home',
    description: '清华大学图书馆推出的OpenSign公益性学术资源服务平台，提供994万+篇文献、3.6万+种期刊的开放获取服务。',
    tags: ['开放获取', '学术资源', '公益服务'],
    icon: Library,
  },
]

export function UniversitiesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">高校直达</h1>
        <p className="text-muted-foreground">
          整合内蒙古各高校图书馆资源与权威学术平台，一键直达优质学术资源。
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">内蒙古高校图书馆</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((uni) => (
            <Card key={uni.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{uni.name}</CardTitle>
                <div className="flex flex-wrap gap-1">
                  {uni.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                <CardDescription className="flex-1">{uni.description}</CardDescription>
                <Button asChild className="w-full gap-2">
                  <a href={uni.url} target="_blank" rel="noopener noreferrer">
                    访问网站
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Library className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">权威学术平台</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {academicPlatforms.map((platform) => {
            const IconComponent = platform.icon
            return (
              <Card key={platform.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                      <div className="flex flex-wrap gap-1">
                        {platform.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-3">
                  <CardDescription className="flex-1">{platform.description}</CardDescription>
                  <Button asChild variant="outline" className="w-full gap-2">
                    <a href={platform.url} target="_blank" rel="noopener noreferrer">
                      访问平台
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">温馨提示</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            部分学术数据库需要在校园网环境下访问，或通过学校VPN登录后使用。如遇访问问题，请联系所在学校图书馆获取帮助。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

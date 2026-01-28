import { useState } from 'react';
import { ContentRecommendationPrototype } from './components/ContentRecommendationPrototype';
import { WorkflowBuilderPrototype } from './components/WorkflowBuilderPrototype';
import { Sparkles, Eye, Zap, Clock, HelpCircle, Workflow, Smartphone } from 'lucide-react';

type DesignPreference = 'immediate' | 'delayed' | 'unsure' | null;
type ClickedElement = 'refresh' | 'personalization' | 'card' | 'condition' | 'llm' | 'extraction' | 'connection' | null;
type PrototypeType = 'recommendation' | 'workflow';

export default function App() {
  const [prompt, setPrompt] = useState("我想做一个内容推荐界面，根据用户历史行为给出个性化推荐，可以下拉刷新。");
  const [prototypeType, setPrototypeType] = useState<PrototypeType>('workflow');
  const [showPrototype, setShowPrototype] = useState(true);
  const [showInsights, setShowInsights] = useState(false);
  const [designPreference, setDesignPreference] = useState<DesignPreference>(null);
  const [clickedElement, setClickedElement] = useState<ClickedElement>(null);
  const [discoveredElements, setDiscoveredElements] = useState<Set<string>>(new Set());

  const handleElementClick = (element: ClickedElement) => {
    setClickedElement(element);
    if (element) {
      setDiscoveredElements(prev => new Set(prev).add(element));
    }
    if (!showInsights) {
      setShowInsights(true);
    }
  };

  const getPreferenceDetails = (pref: DesignPreference) => {
    switch (pref) {
      case 'immediate':
        return {
          title: '即时反馈模式',
          implications: [
            '需要预加载推荐内容',
            '增加客户端缓存复杂度',
            '可能消耗更多流量',
            '但用户体验更流畅'
          ],
          icon: Zap,
          color: 'amber'
        };
      case 'delayed':
        return {
          title: '延迟更新模式',
          implications: [
            '服务器按需计算推荐',
            '减少资源消耗',
            '用户需要等待几秒',
            '但系统架构更简单'
          ],
          icon: Clock,
          color: 'blue'
        };
      case 'unsure':
        return {
          title: '保留模糊',
          implications: [
            '可以稍后根据实际情况决定',
            '现在专注于核心体验',
            '技术选型暂时开放'
          ],
          icon: HelpCircle,
          color: 'slate'
        };
      default:
        return null;
    }
  };

  const preferenceDetails = designPreference ? getPreferenceDetails(designPreference) : null;

  const getElementExplanation = (element: ClickedElement) => {
    switch (element) {
      case 'refresh':
        return {
          title: '推荐刷新',
          description: '用户下拉刷新时，系统会重新计算推荐内容。',
          behaviors: [
            { label: '这需要后台处理', color: 'orange' },
            { label: '结果不会立即返回', color: 'orange' },
            { label: '每次刷新可能得到不同内容', color: 'amber' }
          ],
          commitments: '你的设计隐含了对异步处理和不确定性输出的承诺'
        };
      case 'personalization':
        return {
          title: '个性化推荐',
          description: '根据用户历史行为动态生成推荐内容。',
          behaviors: [
            { label: '相同输入产生不同结果', color: 'amber' },
            { label: '需要持续收集用户数据', color: 'purple' },
            { label: '依赖用户行为历史', color: 'purple' }
          ],
          commitments: '你的设计隐含了对状态持久化和概率性输出的承诺'
        };
      case 'card':
        return {
          title: '推荐列表',
          description: '一个可滚动的卡片列表，每个卡片显示推荐内容。',
          behaviors: [
            { label: '需要动态加载内容', color: 'blue' },
            { label: '支持无限滚动或分页', color: 'blue' },
            { label: '每次显示的内容可能不同', color: 'amber' }
          ],
          commitments: '你的设计隐含了对内容管理和数据获取的承诺'
        };
      case 'condition':
        return {
          title: '条件判断',
          description: '根据不同的条件执行不同的操作。',
          behaviors: [
            { label: '需要定义条件逻辑', color: 'blue' },
            { label: '支持多种条件组合', color: 'blue' },
            { label: '影响流程执行路径', color: 'amber' }
          ],
          commitments: '你的设计隐含了对逻辑控制和流程管理的承诺'
        };
      case 'llm':
        return {
          title: '大语言模型',
          description: '使用大语言模型生成文本或执行任务。',
          behaviors: [
            { label: '需要调用外部API', color: 'orange' },
            { label: '结果可能不确定', color: 'orange' },
            { label: '支持多种任务类型', color: 'amber' }
          ],
          commitments: '你的设计隐含了对外部服务依赖和结果不可预测性的承诺'
        };
      case 'extraction':
        return {
          title: '信息提取',
          description: '从文本中提取关键信息。',
          behaviors: [
            { label: '需要定义提取规则', color: 'blue' },
            { label: '支持多种数据源', color: 'blue' },
            { label: '影响数据处理流程', color: 'amber' }
          ],
          commitments: '你的设计隐含了对数据处理和信息提取的承诺'
        };
      case 'connection':
        return {
          title: '系统连接',
          description: '连接不同的系统或服务。',
          behaviors: [
            { label: '需要定义连接逻辑', color: 'blue' },
            { label: '支持多种连接方式', color: 'blue' },
            { label: '影响系统集成', color: 'amber' }
          ],
          commitments: '你的设计隐含了对系统集成和连接管理的承诺'
        };
      default:
        return null;
    }
  };

  const elementExplanation = clickedElement ? getElementExplanation(clickedElement) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-slate-900">Vibe Coding Studio</h1>
                <p className="text-xs text-slate-500">自然语言原型设计</p>
              </div>
            </div>
            <button
              onClick={() => setShowInsights(!showInsights)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                showInsights
                  ? 'bg-violet-100 text-violet-700 border border-violet-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
              }`}
            >
              <Eye className="w-4 h-4" />
              {showInsights ? '隐藏系统逻辑' : '查看系统逻辑'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel: Input */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <label className="block mb-3">
                <span className="text-sm font-medium text-slate-700 block mb-2">
                  描述你想做的产品
                </span>
                <span className="text-xs text-slate-500 block mb-4">
                  用自然语言描述，不需要考虑技术实现
                </span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-40 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none text-slate-700 placeholder:text-slate-400"
                placeholder="例如：我想做一个任务管理应用，支持拖拽排序和截止日期提醒..."
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-400">
                  {prompt.length} 字符
                </span>
                <button
                  onClick={() => setShowPrototype(true)}
                  className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-violet-600 hover:to-purple-700 transition-all shadow-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  生成原型
                </button>
              </div>
            </div>

            {/* Insights Panel */}
            {showInsights && (
              <div className="bg-white rounded-xl border border-violet-200 shadow-sm p-6 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-full bg-violet-400 rounded-full" />
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900 mb-2">隐含的系统行为</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      这些特征不是你显式选择的，而是在设计过程中自然出现的。
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-slate-700 font-medium">输出不确定性</p>
                          <p className="text-xs text-slate-500 mt-1">相同输入可能产生不同推荐结果</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-slate-700 font-medium">异步处理需求</p>
                          <p className="text-xs text-slate-500 mt-1">下拉刷新需要后台处理，结果不会立即返回</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-slate-700 font-medium">状态持久化</p>
                          <p className="text-xs text-slate-500 mt-1">需要持续维护用户历史行为数据</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-200 my-4" />

                <div>
                  <h3 className="font-medium text-slate-900 mb-3">对应的技术承诺</h3>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm text-slate-600">
                    <p>• 持续维护用户状态</p>
                    <p>• 接受结果不可预测</p>
                    <p>• 支持异步处理</p>
                  </div>
                </div>

                <div className="h-px bg-slate-200 my-4" />

                <div>
                  <h3 className="font-medium text-slate-900 mb-3">设计取向</h3>
                  <p className="text-xs text-slate-500 mb-3">对于"推荐刷新"这个设计，你更倾向于：</p>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                      <input type="radio" name="preference" className="mt-0.5" onChange={() => setDesignPreference('immediate')} />
                      <div>
                        <p className="text-sm font-medium text-slate-700">即时反馈</p>
                        <p className="text-xs text-slate-500 mt-0.5">结果快，但系统更复杂</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                      <input type="radio" name="preference" className="mt-0.5" onChange={() => setDesignPreference('delayed')} />
                      <div>
                        <p className="text-sm font-medium text-slate-700">延迟更新</p>
                        <p className="text-xs text-slate-500 mt-0.5">体验慢一点，但系统简单</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                      <input type="radio" name="preference" className="mt-0.5" defaultChecked onChange={() => setDesignPreference('unsure')} />
                      <div>
                        <p className="text-sm font-medium text-slate-700">现在不确定</p>
                        <p className="text-xs text-slate-500 mt-0.5">保留模糊，稍后决定</p>
                      </div>
                    </label>
                  </div>
                </div>

                {preferenceDetails && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className={`bg-gradient-to-r ${
                      preferenceDetails.color === 'amber' ? 'from-amber-50 to-amber-100 border-amber-200' :
                      preferenceDetails.color === 'blue' ? 'from-blue-50 to-blue-100 border-blue-200' :
                      'from-slate-50 to-slate-100 border-slate-200'
                    } border rounded-lg p-4 space-y-3`}>
                      <div className="flex items-center gap-2">
                        <preferenceDetails.icon className={`w-5 h-5 ${
                          preferenceDetails.color === 'amber' ? 'text-amber-600' :
                          preferenceDetails.color === 'blue' ? 'text-blue-600' :
                          'text-slate-600'
                        }`} />
                        <p className="font-semibold text-slate-900">{preferenceDetails.title}</p>
                      </div>
                      <div className="space-y-1.5">
                        {preferenceDetails.implications.map((implication, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className={`w-1 h-1 rounded-full mt-2 ${
                              preferenceDetails.color === 'amber' ? 'bg-amber-500' :
                              preferenceDetails.color === 'blue' ? 'bg-blue-500' :
                              'bg-slate-500'
                            }`} />
                            <p className="text-sm text-slate-700">{implication}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {elementExplanation && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">
                            {discoveredElements.size}
                          </div>
                          <p className="font-semibold text-slate-900">{elementExplanation.title}</p>
                        </div>
                        <button 
                          onClick={() => setClickedElement(null)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-sm text-slate-600">{elementExplanation.description}</p>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-slate-500 uppercase">系统行为特征</p>
                        {elementExplanation.behaviors.map((behavior, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                              behavior.color === 'orange' ? 'bg-orange-400' :
                              behavior.color === 'amber' ? 'bg-amber-400' :
                              behavior.color === 'purple' ? 'bg-purple-400' :
                              'bg-blue-400'
                            }`} />
                            <p className="text-sm text-slate-700">{behavior.label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-violet-200">
                        <p className="text-xs text-violet-700 italic">{elementExplanation.commitments}</p>
                      </div>
                    </div>
                  </div>
                )}

                {discoveredElements.size > 0 && (
                  <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="flex -space-x-1">
                        {Array.from(discoveredElements).map((el, idx) => (
                          <div 
                            key={el} 
                            className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${
                              el === 'refresh' ? 'bg-orange-400 text-white' :
                              el === 'personalization' ? 'bg-amber-400 text-white' :
                              'bg-blue-400 text-white'
                            }`}
                          >
                            {idx + 1}
                          </div>
                        ))}
                      </div>
                      <span>已探索 {discoveredElements.size} 个设计元素</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel: Prototype Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            {discoveredElements.size === 0 && showPrototype && (
              <div className="mb-4 p-3 bg-violet-50 border border-violet-200 rounded-lg animate-pulse">
                <p className="text-xs text-violet-700 text-center">
                  💡 点击原型中的元素查看背后的技术含义
                </p>
              </div>
            )}
            
            {/* Prototype Type Switcher */}
            <div className="mb-4 bg-white rounded-lg border border-slate-200 p-2 flex gap-2">
              <button
                onClick={() => {
                  setPrototypeType('recommendation');
                  setDiscoveredElements(new Set());
                  setClickedElement(null);
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  prototypeType === 'recommendation'
                    ? 'bg-violet-100 text-violet-700 border border-violet-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                推荐界面
              </button>
              <button
                onClick={() => {
                  setPrototypeType('workflow');
                  setDiscoveredElements(new Set());
                  setClickedElement(null);
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  prototypeType === 'workflow'
                    ? 'bg-violet-100 text-violet-700 border border-violet-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Workflow className="w-4 h-4" />
                工作流
              </button>
            </div>
            
            <div className="bg-slate-900 rounded-xl shadow-xl overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  </div>
                  <span className="text-xs text-slate-400 ml-3">原型预览</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-slate-500">{prototypeType === 'workflow' ? 'Desktop View' : 'iPhone 14 Pro'}</div>
                </div>
              </div>
              
              {/* Device Frame */}
              <div className="bg-slate-800 p-6 flex justify-center">
                {prototypeType === 'recommendation' ? (
                  <div className="w-full max-w-[375px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-slate-900 relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-10" />
                    
                    {/* Prototype Content */}
                    {showPrototype && <ContentRecommendationPrototype showIndicators={true} onElementClick={handleElementClick} />}
                  </div>
                ) : (
                  <div className="w-full max-w-[640px] bg-white rounded-xl shadow-2xl overflow-hidden">
                    {/* Prototype Content */}
                    {showPrototype && <WorkflowBuilderPrototype showIndicators={true} onElementClick={handleElementClick} />}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
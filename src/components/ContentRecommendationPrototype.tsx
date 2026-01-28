import { useState, useEffect } from 'react';
import { RefreshCw, Heart, Share2, Bookmark, MoreHorizontal, TrendingUp } from 'lucide-react';

interface ContentRecommendationPrototypeProps {
  showIndicators: boolean;
  onElementClick: (element: 'refresh' | 'personalization' | 'card' | null) => void;
}

interface ContentCard {
  id: number;
  title: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  likes: number;
}

export function ContentRecommendationPrototype({ showIndicators, onElementClick }: ContentRecommendationPrototypeProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const [content, setContent] = useState<ContentCard[]>([
    {
      id: 1,
      title: "设计系统的可扩展性思考",
      author: "张设计",
      category: "设计系统",
      readTime: "8分钟",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
      likes: 234
    },
    {
      id: 2,
      title: "用户研究中的偏见识别",
      author: "李研究",
      category: "用户研究",
      readTime: "12分钟",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      likes: 189
    },
    {
      id: 3,
      title: "微交互设计的7个原则",
      author: "王交互",
      category: "交互设计",
      readTime: "6分钟",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop",
      likes: 312
    }
  ]);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate async refresh
    setTimeout(() => {
      // Simulate probabilistic content changes
      const shuffled = [...content].sort(() => Math.random() - 0.5);
      setContent(shuffled);
      setRefreshing(false);
    }, 1500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentTouch = e.touches[0].clientY;
    const distance = currentTouch - touchStart;
    if (distance > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(distance, 80));
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      handleRefresh();
    }
    setPullDistance(0);
  };

  return (
    <div 
      className="h-[667px] overflow-y-auto bg-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Status Bar */}
      <div className="h-11 bg-white flex items-center justify-between px-6 text-xs pt-2">
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 border border-black rounded-sm relative">
            <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-black rounded-r" />
            <div className="absolute inset-0.5 bg-black rounded-sm" />
          </div>
        </div>
      </div>

      {/* Pull to Refresh Indicator */}
      <div 
        className="relative transition-all duration-200 ease-out overflow-visible"
        style={{ 
          height: refreshing ? '48px' : `${pullDistance}px`,
          opacity: refreshing ? 1 : pullDistance / 60
        }}
      >
        <div className="flex items-center justify-center h-full relative">
          {showIndicators && !refreshing && pullDistance > 30 && (
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-20">
              <div 
                className="relative group"
                onMouseEnter={() => setShowTooltip('refresh')}
                onMouseLeave={() => setShowTooltip(null)}
                onClick={() => onElementClick('refresh')}
              >
                <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                {showTooltip === 'refresh' && (
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-48 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-50 whitespace-normal">
                    这个交互通常需要后台处理，结果不会立即返回
                  </div>
                )}
              </div>
            </div>
          )}
          <RefreshCw 
            className={`w-5 h-5 text-slate-400 ${refreshing ? 'animate-spin' : ''}`}
            style={{ transform: `rotate(${pullDistance * 3}deg)` }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pt-4 pb-3 bg-white sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-900">为你推荐</h1>
          <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button className="px-4 py-1.5 bg-slate-900 text-white text-sm rounded-full whitespace-nowrap flex items-center gap-1.5 relative">
            <TrendingUp className="w-3.5 h-3.5" />
            个性化
            {showIndicators && (
              <div 
                className="absolute -top-1 -right-1 group"
                onMouseEnter={() => setShowTooltip('personalized')}
                onMouseLeave={() => setShowTooltip(null)}
                onClick={() => onElementClick('personalization')}
              >
                <div className="w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white" />
                {showTooltip === 'personalized' && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-6 w-48 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-50 whitespace-normal">
                    这个功能意味着：相同输入可能产生不同结果
                  </div>
                )}
              </div>
            )}
          </button>
          <button className="px-4 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full whitespace-nowrap">
            设计
          </button>
          <button className="px-4 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full whitespace-nowrap">
            技术
          </button>
          <button className="px-4 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full whitespace-nowrap">
            产品
          </button>
        </div>
      </div>

      {/* Content Cards */}
      <div className="px-6 py-4 space-y-4">
        {content.map((card, index) => (
          <div 
            key={card.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-md transition-shadow"
            style={{ 
              animation: refreshing ? 'none' : index === 0 ? 'slideIn 0.3s ease-out' : 'none'
            }}
            onClick={() => onElementClick('card')}
          >
            <img 
              src={card.image}
              alt={card.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-md">
                  {card.category}
                </span>
                <span className="text-xs text-slate-500">{card.readTime}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 leading-snug">
                {card.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{card.author}</span>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-slate-500 hover:text-rose-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{card.likes}</span>
                  </button>
                  <button className="text-slate-500 hover:text-slate-700 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="text-slate-500 hover:text-slate-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Loading State */}
        {refreshing && (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200 animate-pulse">
                <div className="w-full h-40 bg-slate-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-24" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Safe Area */}
      <div className="h-8" />

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
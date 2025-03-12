
import React from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MetricItem {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  iconColor: string;
}

interface MetricsOverviewProps {
  metrics: MetricItem[];
}

export const MetricCard: React.FC<{
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  iconColor: string;
}> = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  color,
  iconColor
}) => {
  return (
    <Card>
      <CardContent className="pt-4 md:pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-lg md:text-2xl font-bold mt-1">{value}</h3>
            <div className="flex items-center mt-1">
              <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
              {trend === 'up' ? 
                <ArrowUpRight className="h-3 w-3 text-green-600 ml-1" /> : 
                <ArrowDownRight className="h-3 w-3 text-red-600 ml-1" />
              }
              <span className="text-xs text-gray-500 ml-1">vs previous period</span>
            </div>
          </div>
          <div className={`${color} p-2 rounded-md`}>
            <Icon className={`h-4 w-4 md:h-5 md:w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {metrics.map((metric, index) => (
        <MetricCard 
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          trend={metric.trend}
          icon={metric.icon}
          color={metric.color}
          iconColor={metric.iconColor}
        />
      ))}
    </div>
  );
};

export default MetricsOverview;

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Send, Sparkles, MessageSquare } from 'lucide-react';

export const InputNode = memo(({ data }) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/50 to-indigo-700/50 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
      <div className="relative p-5 bg-[#0f172a]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] min-w-[280px]">
        <div className="flex items-center gap-3 mb-4 pointer-events-none">
          <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
            User Question
          </p>
        </div>
        
        <textarea
          rows={3}
          value={data.value}
          onChange={(evt) => data.onChange(evt.target.value)}
          placeholder="Ask me anything..."
          className="nodrag nowheel w-full bg-slate-950/60 p-4 rounded-xl border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/40 transition-all font-medium placeholder-slate-600 resize-none min-h-[100px]"
        />
        
        <Handle 
          type="source" 
          position={Position.Right} 
          className="w-4 h-4 rounded-full bg-indigo-500 border-[3px] border-slate-900 right-[-10px] hover:scale-125 transition-transform shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
        />
      </div>
    </div>
  );
});

export const ResultNode = memo(({ data }) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 to-emerald-400/50 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
      <div className="relative p-5 bg-[#0f172a]/95 backdrop-blur-3xl border border-emerald-500/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] min-w-[320px] max-w-[450px]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
            Assistant Insight
          </p>
        </div>
        
        <div className="nodrag nowheel w-full p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/15 min-h-[120px] max-h-[400px] overflow-auto custom-scrollbar">
          {data.label ? (
            <p className="text-emerald-50/90 text-sm leading-relaxed font-medium whitespace-pre-wrap">
              {data.label}
            </p>
          ) : (
            <p className="text-slate-500 italic text-sm animate-pulse flex items-center gap-2">
               <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
               Processing your request...
            </p>
          )}
        </div>
        
        <Handle 
          type="target" 
          position={Position.Left} 
          className="w-4 h-4 rounded-full bg-emerald-500 border-[3px] border-slate-900 left-[-10px] hover:scale-125 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
        />
      </div>
    </div>
  );
});

InputNode.displayName = 'InputNode';
ResultNode.displayName = 'ResultNode';

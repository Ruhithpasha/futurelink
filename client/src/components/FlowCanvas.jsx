import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import toast, { Toaster } from 'react-hot-toast';
import { InputNode, ResultNode } from './CustomNodes';
import { askAI, saveFlow } from '../api';
import { Play, Database, Loader2, Sparkles, Terminal, Briefcase, User, ExternalLink, ArrowRight } from 'lucide-react';

const nodeTypes = {
  textInput: InputNode,
  result: ResultNode,
};

const proOptions = { hideAttribution: true };

export default function FlowCanvas() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleInputChange = useCallback((id, newValue) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, value: newValue },
          };
        }
        return node;
      })
    );
  }, []);

  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'textInput',
      position: { x: 100, y: 150 },
      data: { value: '', onChange: (val) => handleInputChange('1', val) },
    },
    {
      id: '2',
      type: 'result',
      position: { x: 550, y: 150 },
      data: { label: '' },
    },
  ]);

  const [edges, setEdges] = useState([
    { 
      id: 'e1-2', 
      source: '1', 
      target: '2', 
      animated: true, 
      style: { stroke: '#6366f1', strokeWidth: 3, filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))' } 
    },
  ]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleRunFlow = async () => {
    const inputNode = nodes.find((n) => n.id === '1');
    const prompt = inputNode.data.value;

    if (!prompt.trim()) {
      toast.error('Please enter a prompt first.');
      return;
    }

    const toastId = toast.loading('Thinking...');
    setLoading(true);
    try {
      const response = await askAI(prompt);
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === '2') {
            return {
              ...node,
              data: { ...node.data, label: response },
            };
          }
          return node;
        })
      );
      toast.success('AI responded successfully!', { id: toastId });
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.error || error.message;
      toast.error(`AI error: ${errMsg}`, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFlow = async () => {
    const promptNode = nodes.find((n) => n.id === '1');
    const resultNode = nodes.find((n) => n.id === '2');
    const prompt = promptNode.data.value;
    const response = resultNode.data.label;

    if (!prompt || !response) {
      toast.error('Run the flow before saving.');
      return;
    }

    setSaving(true);
    const toastId = toast.loading('Saving to MongoDB...');
    try {
      await saveFlow(prompt, response);
      toast.success('Flow saved to Database!', { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error('Failed to save flow.', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#020617] relative font-sans text-slate-200">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      />
      
      {/* Sleek Top Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl cursor-default">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-4 rounded-[2.5rem] flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-3 px-4">
            <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-600/30">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-extrabold text-white text-xl tracking-tight">
              AI Flow <span className="text-indigo-400">Gen</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunFlow}
              disabled={loading}
              className="group flex items-center gap-3 px-8 py-3 bg-white text-slate-950 hover:bg-slate-200 rounded-[1.5rem] transition-all duration-300 font-extrabold shadow-xl active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin text-indigo-600" /> : <Play className="w-5 h-5 fill-indigo-600 text-indigo-600 group-hover:scale-110 transition-transform" />}
              RUN FLOW
            </button>
            <button
              onClick={handleSaveFlow}
              disabled={saving}
              className="flex items-center gap-3 px-8 py-3 bg-slate-800 text-white hover:bg-slate-700 border border-white/10 rounded-[1.5rem] transition-all duration-300 font-extrabold shadow-xl active:scale-95 disabled:opacity-50 uppercase tracking-widest text-[10px]"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin text-emerald-400" /> : <Database className="w-4 h-4 text-emerald-400" />}
              Save Result
            </button>
          </div>
        </div>
      </nav>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={proOptions}
      >
        <Background 
          color="#1e293b" 
          variant="dots" 
          gap={25} 
          size={1.5} 
          style={{ backgroundColor: '#020617' }} 
        />
      </ReactFlow>

      {/* MUCH BIGGER FOOTER FOR MAXIMUM IMPACT */}
      <footer className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 bg-slate-900/60 backdrop-blur-3xl p-4 rounded-[4rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.85)] group hover:border-white/20 transition-all">
        <div className="px-12 py-4 flex items-center gap-4 border-r border-white/15 select-none hover:bg-white/5 rounded-l-[3rem] transition-colors cursor-default">
          <div className="w-4 h-4 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_20px_rgba(99,102,241,1)]" />
          <span className="text-sm font-black tracking-[0.3em] text-white uppercase leading-none whitespace-nowrap">Connect with Me</span>
        </div>
        
        <div className="flex items-center gap-6 p-2 pr-10">
          <a 
            href="https://github.com/ruhithpasha" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 px-8 py-4 hover:bg-white/5 rounded-full transition-all duration-300 group/link scale-110"
            title="View Open Source Projects"
          >
            <Terminal className="w-7 h-7 text-slate-300 group-hover/link:text-white transition-colors" />
            <span className="text-base font-bold text-slate-200 group-hover/link:text-white">GitHub</span>
          </a>
          
          <a 
            href="https://linkedin.com/in/ruhith-pasha-8a3625245" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 px-8 py-4 hover:bg-sky-500/10 rounded-full transition-all duration-300 group/link scale-110"
            title="Let's Network"
          >
            <Briefcase className="w-7 h-7 text-slate-300 group-hover/link:text-sky-400 transition-colors" />
            <span className="text-base font-bold text-slate-200 group-hover/link:text-sky-400 text-nowrap">Hire Me</span>
          </a>
          
          <a 
            href="https://portfolioruhith.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative flex items-center gap-6 px-14 py-6 bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all duration-500 font-black shadow-[0_15px_40px_rgba(79,70,229,0.5)] overflow-hidden scale-110"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <User className="w-8 h-8 text-white" />
            <span className="text-xl text-white text-nowrap leading-none tracking-tight">View Portfolio</span>
            <ArrowRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-3" />
          </a>
        </div>
      </footer>
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-2/3 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[180px]" />
      </div>
    </div>
  );
}

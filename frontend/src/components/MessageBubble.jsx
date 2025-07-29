import React from 'react';
import { Bot, User } from 'lucide-react';

const MessageBubble = ({ message, isBot = false, isLoading = false }) => {
  return (
    <div className={`flex items-start gap-3 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <Bot size={16} className="text-white" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl ${
        isBot 
          ? 'bg-slate-700 text-slate-100' 
          : 'bg-blue-600 text-white ml-auto'
      } shadow-sm animate-fadeIn`}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-sm text-slate-300">Analyzing symptoms...</span>
          </div>
        ) : (
          <p className="text-sm leading-relaxed">{message}</p>
        )}
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center ml-3">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
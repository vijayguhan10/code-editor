import React, { useState, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { 
  Play, 
  Copy, 
  Code, 
  Zap, 
  Moon, 
  Sun, 
  Terminal,
  Sparkles,
  Send,
  RotateCcw
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  code?: string;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('// Your generated code will appear here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const editorRef = useRef<any>(null);

  // Simulate AI code generation based on prompts
  const generateCode = (userPrompt: string): string => {
    const lowerPrompt = userPrompt.toLowerCase();
    
    if (lowerPrompt.includes('fibonacci') || lowerPrompt.includes('fib')) {
      return `// Fibonacci sequence generator
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Generate first 10 fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`Fibonacci(\${i}) = \${fibonacci(i)}\`);
}`;
    }
    
    if (lowerPrompt.includes('todo') || lowerPrompt.includes('task')) {
      return `// Simple Todo List Manager
class TodoList {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }
  
  addTodo(text) {
    const todo = {
      id: this.nextId++,
      text: text,
      completed: false,
      createdAt: new Date()
    };
    this.todos.push(todo);
    console.log('Added:', todo);
    return todo;
  }
  
  completeTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = true;
      console.log('Completed:', todo);
    }
  }
  
  listTodos() {
    console.log('📝 Todo List:');
    this.todos.forEach(todo => {
      const status = todo.completed ? '✅' : '⏳';
      console.log(\`\${status} \${todo.text}\`);
    });
  }
}

// Demo usage
const todoList = new TodoList();
todoList.addTodo('Learn React');
todoList.addTodo('Build awesome apps');
todoList.completeTodo(1);
todoList.listTodos();`;
    }
    
    if (lowerPrompt.includes('calculator')) {
      return `// Advanced Calculator
class Calculator {
  constructor() {
    this.history = [];
  }
  
  add(a, b) {
    const result = a + b;
    this.history.push(\`\${a} + \${b} = \${result}\`);
    return result;
  }
  
  subtract(a, b) {
    const result = a - b;
    this.history.push(\`\${a} - \${b} = \${result}\`);
    return result;
  }
  
  multiply(a, b) {
    const result = a * b;
    this.history.push(\`\${a} × \${b} = \${result}\`);
    return result;
  }
  
  divide(a, b) {
    if (b === 0) throw new Error('Division by zero!');
    const result = a / b;
    this.history.push(\`\${a} ÷ \${b} = \${result}\`);
    return result;
  }
  
  power(base, exp) {
    const result = Math.pow(base, exp);
    this.history.push(\`\${base}^\${exp} = \${result}\`);
    return result;
  }
  
  getHistory() {
    console.log('📊 Calculation History:');
    this.history.forEach((calc, i) => console.log(\`\${i + 1}. \${calc}\`));
  }
}

// Demo calculations
const calc = new Calculator();
console.log('Result:', calc.add(15, 25));
console.log('Result:', calc.multiply(8, 7));
console.log('Result:', calc.power(2, 8));
calc.getHistory();`;
    }
    
    if (lowerPrompt.includes('array') || lowerPrompt.includes('sort') || lowerPrompt.includes('filter')) {
      return `// Array Manipulation Utilities
const data = [
  { name: 'Alice', age: 28, city: 'New York' },
  { name: 'Bob', age: 34, city: 'San Francisco' },
  { name: 'Charlie', age: 23, city: 'Chicago' },
  { name: 'Diana', age: 31, city: 'New York' }
];

console.log('🔍 Original data:');
console.table(data);

// Filter by age
const adults = data.filter(person => person.age >= 25);
console.log('\\n👥 Adults (25+):');
console.table(adults);

// Sort by age
const sortedByAge = [...data].sort((a, b) => a.age - b.age);
console.log('\\n📊 Sorted by age:');
console.table(sortedByAge);

// Group by city
const grouped = data.reduce((acc, person) => {
  if (!acc[person.city]) acc[person.city] = [];
  acc[person.city].push(person);
  return acc;
}, {});

console.log('\\n🏙️ Grouped by city:');
Object.entries(grouped).forEach(([city, people]) => {
  console.log(\`\${city}: \${people.map(p => p.name).join(', ')}\`);
});`;
    }
    
    if (lowerPrompt.includes('api') || lowerPrompt.includes('fetch') || lowerPrompt.includes('request')) {
      return `// API Request Handler with Error Handling
class APIClient {
  constructor(baseURL = 'https://jsonplaceholder.typicode.com') {
    this.baseURL = baseURL;
  }
  
  async get(endpoint) {
    try {
      console.log(\`🌐 Fetching: \${this.baseURL}\${endpoint}\`);
      const response = await fetch(\`\${this.baseURL}\${endpoint}\`);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      console.log('✅ Success:', data);
      return data;
    } catch (error) {
      console.error('❌ Error:', error.message);
      throw error;
    }
  }
  
  async post(endpoint, data) {
    try {
      console.log(\`📤 Posting to: \${this.baseURL}\${endpoint}\`);
      const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      console.log('✅ Posted:', result);
      return result;
    } catch (error) {
      console.error('❌ Error:', error.message);
      throw error;
    }
  }
}

// Demo usage
const api = new APIClient();

// Note: These are simulated calls for demo purposes
console.log('This would make real API calls in a live environment');
console.log('Example endpoints: /posts, /users, /comments');`;
    }
    
    // Default code generation
    return `// Generated code based on your prompt: "${userPrompt}"
console.log('🚀 AI-Generated Code');

// Custom implementation based on your requirements
function processRequest(input) {
  console.log('Processing:', input);
  
  // Add your custom logic here
  const result = input.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  console.log('Result:', result);
  return result;
}

// Demo execution
const userInput = "${userPrompt}";
const processed = processRequest(userInput);
console.log('Final output:', processed);`;
  };

  const handleGenerateCode = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedCode = generateCode(prompt);
    setCode(generatedCode);
    
    // Add assistant message
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: `I've generated code based on your prompt: "${prompt}"`,
      code: generatedCode
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setPrompt('');
    setIsLoading(false);
  };

  const runCode = () => {
    try {
      // Clear previous output
      setOutput('');
      
      // Create a custom console for capturing output
      const outputLines: string[] = [];
      const customConsole = {
        log: (...args: any[]) => {
          const line = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          outputLines.push(line);
        },
        error: (...args: any[]) => {
          const line = '❌ ' + args.map(arg => String(arg)).join(' ');
          outputLines.push(line);
        },
        warn: (...args: any[]) => {
          const line = '⚠️ ' + args.map(arg => String(arg)).join(' ');
          outputLines.push(line);
        },
        table: (data: any) => {
          outputLines.push('📊 Table data:');
          outputLines.push(JSON.stringify(data, null, 2));
        }
      };
      
      // Execute code with custom console
      const func = new Function('console', code);
      func(customConsole);
      
      setOutput(outputLines.join('\n') || '✅ Code executed successfully (no output)');
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const clearAll = () => {
    setCode('// Your generated code will appear here\nconsole.log("Hello, World!");');
    setOutput('');
    setMessages([]);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 backdrop-blur-lg border-b transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  AI Code Generator
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Generate, edit, and execute code with AI assistance
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={clearAll}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-100 text-blue-600 hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Chat History */}
        {messages.length > 0 && (
          <div className="mb-8">
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Conversation History
            </h2>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`p-4 rounded-xl ${
                    message.type === 'user'
                      ? isDarkMode ? 'bg-blue-900/50 ml-12' : 'bg-blue-50 ml-12'
                      : isDarkMode ? 'bg-gray-800/50 mr-12' : 'bg-gray-50 mr-12'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gradient-to-r from-purple-600 to-blue-600'
                    }`}>
                      {message.type === 'user' ? 
                        <Terminal className="w-4 h-4 text-white" /> : 
                        <Sparkles className="w-4 h-4 text-white" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prompt Input */}
        <div className={`mb-8 p-6 rounded-2xl backdrop-blur-lg transition-all duration-300 ${
          isDarkMode 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/80 border border-gray-200 shadow-lg'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <Zap className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Describe the code you want to generate
            </h2>
          </div>
          
          <div className="flex space-x-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateCode()}
              placeholder="e.g., Create a todo list manager, Build a calculator, Generate a fibonacci sequence..."
              className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
              disabled={isLoading}
            />
            
            <button
              onClick={handleGenerateCode}
              disabled={!prompt.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2 shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Editor */}
          <div className={`rounded-2xl backdrop-blur-lg transition-all duration-300 ${
            isDarkMode 
              ? 'bg-white/5 border border-white/10' 
              : 'bg-white/80 border border-gray-200 shadow-lg'
          }`}>
            <div className="p-6 border-b border-gray-200/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Code className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Code Editor
                  </h3>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyCode}
                    className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title="Copy code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={runCode}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 hover:scale-105 flex items-center space-x-2 shadow-lg"
                  >
                    <Play className="w-4 h-4" />
                    <span>Run</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="rounded-xl overflow-hidden border border-gray-200/20">
                <Editor
                  height="400px"
                  defaultLanguage="javascript"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  onMount={(editor) => {
                    editorRef.current = editor;
                  }}
                  theme={isDarkMode ? 'vs-dark' : 'vs-light'}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: 'on',
                    lineHeight: 22,
                    suggestOnTriggerCharacters: true,
                    acceptSuggestionOnEnter: 'on',
                    tabCompletion: 'on',
                    folding: true,
                    foldingHighlight: true,
                    showFoldingControls: 'always',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className={`rounded-2xl backdrop-blur-lg transition-all duration-300 ${
            isDarkMode 
              ? 'bg-white/5 border border-white/10' 
              : 'bg-white/80 border border-gray-200 shadow-lg'
          }`}>
            <div className="p-6 border-b border-gray-200/20">
              <div className="flex items-center space-x-3">
                <Terminal className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Output Console
                </h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className={`h-96 p-4 rounded-xl border-2 border-dashed transition-all duration-200 overflow-y-auto ${
                output 
                  ? isDarkMode 
                    ? 'bg-gray-900/50 border-gray-600 text-green-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-800'
                  : isDarkMode 
                    ? 'bg-gray-900/30 border-gray-700 text-gray-500' 
                    : 'bg-gray-50/50 border-gray-300 text-gray-400'
              }`}>
                {output ? (
                  <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed">
                    {output}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Terminal className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="font-medium">No output yet</p>
                      <p className="text-sm mt-1">Click "Run" to execute your code</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            AI-powered code generation and execution environment. 
            <span className="ml-2">Built with React, Monaco Editor, and TailwindCSS</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
import express from 'express';
import {createProxyMiddleware} from 'http-proxy-middleware';    
import morgan from 'morgan';
const app = express();
app.use(morgan('combined'));



app.get('/api/status/healthz', (req, res) => {
    res.status(200).json({status: 'ok'});
});

app.get('/api/status/readyz', (req, res) => { 
    res.status(200).json({status: 'ok'});
});



const proxies = {};
const AgentProxy = {};
function getProxy(sandboxId) {
        const target = `http://localhost:3000/${sandboxId}`;

    if (!proxies[sandboxId]) {
        proxies[sandboxId] = createProxyMiddleware({    
       
            target,
            changeOrigin: true,
            ws: true,
      
        });
    }
    return proxies[sandboxId];
}
function getAgentProxy(sandboxId) {
        const target = `http://localhost:3000/${sandboxId}`;

    if (!AgentProxy[sandboxId]) {
        AgentProxy[sandboxId] = createProxyMiddleware({    
       
            target,
            changeOrigin: true,
            ws: true,
      
        });
    }
    return AgentProxy[sandboxId];
}



app.use((req, res, next) => {
    const host = req.headers.host;
    const sandboxId = host.split('.')[0];
   
     if(host.split('.')[1] !== 'agent'){ {

    }
     }else if (host.split('.')[1] !== 'preview') {   {
  
         return getProxy(sandboxId)(req, res, next);
    }}


});



export default app
import {k8sCoreApi} from './config.js'


export async function createPod(sandboxId) {


    const podManifest = {
        metadata: {
            name: `sandbox-${sandboxId}`,
            labels: {
                app: `sandbox-${sandboxId}`,
            },
        },
        spec: {
            volumes: [
                {
                    name: 'workspace-volume ',
                    emptyDir: {},
                },
            ],
            containers: [
                {
                    image:"template",
                    imagepullPolicy: "IfNotPresent",  
                    name:'sandbox-container',
                    ports:[{containerPort: 5173 , name: 'http'  }],
                    resources: {
                        limits: {
                            cpu: '500m',
                            memory: '512Mi',
                        },
                        requests: {
                            cpu: '250m',
                            memory: '256Mi',
                        },
                        volumeMounts: [
                            {
                                name: 'workspace-volume',
                                mountPath: '/workspace',
                            },
                        ],
                    },
                },
                {
                    image:"agent",
                    imagepullPolicy: "IfNotPresent",  
                    name:'agent-container',
                    ports:[{containerPort: 3000 , name: 'agent'  }],    
                    resources: {
                        limits: {
                            cpu: '500m',
                            memory: '512Mi',
                        },
                        requests: {
                            cpu: '250m',
                            memory: '256Mi',
                        },
                          volumeMounts: [
                            {
                                name: 'workspace-volume',
                                mountPath: '/workspace',
                            },
                        ],
                    },
                }
             ]
        },
    };  
const response = await k8sCoreApi.createNamespacedPod({
    namespace: 'default',
    body: podManifest,
});
    return response

}
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
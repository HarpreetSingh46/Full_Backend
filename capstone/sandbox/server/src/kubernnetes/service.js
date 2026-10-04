import {k8sCoreApi} from './config.js'

export const createService = async (sandboxId) => {
    const serviceManifest = {
        metadata: { 
            name: `sandbox-service-${sandboxId}`,
            labels: {
                app: `sandbox-${sandboxId}`,
            },
        },
        spec: { 
            selector: {
                app: `sandbox-${sandboxId}`,
            },

            ports: [
                {
                    protocol: 'TCP',    
                    name: 'http',
                    port: 5173,
                    targetPort: 5173,
                },
            ],
            type: 'ClusterIP', 
        },
    };
const response = await k8sCoreApi.createNamespacedService({
    namespace: 'default',
    body: serviceManifest,
});
return response
}
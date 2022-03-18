
@REM Node Js Comandos
@REM Paso 1: gcloud auth login
@REM 2: gcloud config set project chromatic-night-339004
@REM 3: gcloud container clusters get-credentials cluster-2 --zone=us-central1-c

docker build -t gcr.io/chromatic-night-339004/video-stream-v1 . 
docker push gcr.io/chromatic-night-339004/video-stream-v1 
kubectl rollout restart deployment/video-stream-v1 
kubectl rollout restart deployment/automatico

@REM gcloud endpoints services deploy swagger/recibos.yaml
@REM gcloud container clusters get-credentials cluster-2 --zone=us-central1-c
@REM kubectl --record deployment.apps/server-node set image deployment.v1.apps/server-node server-node-sha256-1=us-central1-docker.pkg.dev/axtop-one/repo-docker-node/server_node:v1.8
gcloud builds submit . --config cloudbuildP.yaml 
@REM kubectl apply -f pods/service.pod.yaml
@REM kubectl rollout restart deployment/video-stream-v1
@REM kubectl exec -it recibos-v1-685c788449-5v6mz -c remesas-recibos-v1 -- bash
@REM kubectl exec -it recibos-caja-v1-6657988784-thzz8 -c recibos-caja-v1 -- bash
@REM codemagic@cph-dev.iam.gserviceaccount.com
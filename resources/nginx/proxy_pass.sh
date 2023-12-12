server {
    listen 80;
    server_name proxy.epimetheus.store;
    underscores_in_headers    on;

    #Define a DNS Resolver
    resolver 8.8.8.8;

    location / {

        # Add CORS headers
        add_header 'Access-Control-Allow-Origin' '' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' '*' always;

        if ($request_uri ~* ^/([^?]*)(\?.*)?$) {
            set $target_url $1;
        }

        # 추출한 경로와 나머지 쿼리 문자열을 합쳐서 프록시 서버로 전달
        proxy_pass $target_url?$args;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Content-Type "application/json";
        proxy_pass_request_headers on;

        # Handle OPTIONS requests for preflight CORS checks
        if ($request_method = 'OPTIONS') {
                add_header 'Content-Length' 0;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Allow-Headers' '*';
                return 204;
       }
    }
}
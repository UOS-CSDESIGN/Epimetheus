server {
        listen 80;

        server_name api.epimetheus.store;

        access_log /var/log/nginx/proxy/access-real.log;
        error_log /var/log/nginx/proxy/error-real.log;

        location / {
                proxy_buffering off;
                proxy_read_timeout 3600s;

                proxy_set_header Connection "keep-alive";
                proxy_set_header Cache-Control "no-cache";

                include /etc/nginx/proxy_params;
                proxy_pass http://10.100.0.4:8080;
        }

        # HealthCheck
        location /health-check {
                    return 200 'ok';
                    add_header Content-Type text/plain;
        }
}
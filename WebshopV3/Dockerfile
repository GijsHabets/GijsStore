FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --quiet
COPY . .

RUN npm run build -- --configuration production


FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# --- Choose the correct dist path for your Angular version ---
# If Angular 15+:
#   dist/<APP_NAME>/browser
# If older Angular:
#   dist/<APP_NAME>
#
# Replace <APP_NAME> below with your Angular project name
# or copy both, the first one that exists will be used.

# default copy (Angular 15+)
COPY --from=build /app/dist/*/browser/ /usr/share/nginx/html/
# fallback (older Angular) - harmless if empty
COPY --from=build /app/dist/*/ /usr/share/nginx/html/

EXPOSE 80

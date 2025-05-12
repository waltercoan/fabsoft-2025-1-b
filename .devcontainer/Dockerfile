# Image metadata and config.
# Ideally, the Node.js version should match what we use on CI.
FROM cimg/node:22.15.0


LABEL name="Angular dev environment" \
      description="This image can be used to create a dev environment for building Angular." \
      vendor="angular" \
      version="1.0"

EXPOSE 4000 4200 4433 5000 8080 9876


# Switch to `root`.
USER root


WORKDIR /home/

COPY . .

RUN bash ./setup.sh
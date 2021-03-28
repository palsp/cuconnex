FROM golang

WORKDIR /go/src/app
COPY go.mod .
RUN go get -d -v ./...
COPY . .
RUN go install -v ./...
CMD ["event-services"]
FROM golang:latest
RUN go get "github.com/go-sql-driver/mysql"
WORKDIR /go/src/app
COPY . .
RUN go get -d -v ./...
RUN go install -v ./...
CMD ["app"]
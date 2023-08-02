# Investit
A website designed for people to be able to create a stock portfolio and research different securities.

## Table of Contents

- [General Info](#general-information)
- [GitHub Repo](#github-repo)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Server Start](#server-start)
- [Usage](#usage)
- [Project Status](#project-status)


## GitHub Repo

- [Monorepo - frontend and backend servers](https://github.com/roylee0912/investit)

## Technologies Used

- Ruby 2.7.4
- Rails 6.1.3
- Active Model Serializers 0.10.12
- NodeJS (v16), and npm
- Postgresql 1.1
- bcrypt 3.1.7
- React 18.2.2
- React-Router-Dom 5.3.3
- React-TradingView-Embed 3.0.6

See Environment Setup below for instructions on installing these tools if you
don't already have them.

## Features

### Backend API Endpoints

| Method | Endpoint          | Params                | Description                                          |
| ------ | ----------------- | --------------------- | ---------------------------------------------------- |
| GET    | /me               |                       | returns logged in user                               |
| POST   | /signup           |                       | creates a new user profile                           |
|        |                   | username              | user name                                            |
|        |                   | password              | user password                                        |
|        |                   | password_confirmation | user password confirmation                           |
| POST   | /login            |                       | creates a user session                               |
|        |                   | username              | user name                                            |
|        |                   | password              | user password                                        |
| DELETE | /logout           |                       | deletes a user session                               |
| GET    | /buying-power     |                       | returns portfolio buying power                       |
| GET    | /account_value    |                       | returns portfolio account value                      |
| GET    | /daily_change     |                       | returns portfolio daily change                       |
| GET    | /total_change     |                       | returns portfolio total change                       |
| PATCH  | /trade            |                       | creates a trade, updating portfolio                  |
|        |                   | name                  | ticker                                               |
|        |                   | shares                | quantity bought or sold                              |


## Environment Setup

### Clone repository

**clone** the project repository from github: [https://github.com/roylee0912/investit](https://github.com/roylee0912/investit)

```console
$ git clone https://github.com/roylee0912/investit
```

### Install the Latest Ruby Version

Verify which version of Ruby you're running by entering this in the terminal:

```sh
ruby -v
```

Make sure that the Ruby version you're running is listed in the [supported
runtimes][] by Heroku. At the time of writing, supported versions are 
2.7.4 or 3.0.2. Our recommendation is 2.7.4, but make sure to check the site
for the latest supported versions.

If it's not, you can use `rvm` to install a newer version of Ruby:

```sh
rvm install 2.7.4 --default
```

You should also install the latest versions of `bundler` and `rails`:

```sh
gem install bundler
gem install rails
```

[supported runtimes]: https://devcenter.heroku.com/articles/ruby-support#supported-runtimes

### Install NodeJS

Verify you are running a recent version of Node with:

```sh
node -v
```

If your Node version is not 16.x.x, install it and set it as the current and
default version with:

```sh
nvm install 16
nvm use 16
nvm alias default 16
```

You can also update your npm version with:

```sh
npm i -g npm
```

### Application Install

When you're ready to start building your project, run:

```sh
bundle install
rails db:create
npm install --prefix client
```

## Server Start

You can use the following commands to run the application:

- `rails db:migrate`: migrate the database
- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)

### Backend Shutdown

It should be possible to shutdown the server using [CTRL-C]. If that fails, follow these steps:

- `lsof -i tcp:9292`
  response:
  COMMAND PID USER ....
  ruby 1234 root ....
- `kill -9 1234`

## Usage

<div style="width:400px ; height:400px">



</div>

1. See Your Portfolio
![image](https://user-images.githubusercontent.com/60560932/202210032-398564d3-fd42-4670-993c-5032683a54bd.png)
2. Trade Stocks
![image](https://user-images.githubusercontent.com/60560932/202210262-66eda684-eec1-43e7-9594-a0764ddfebb4.png)
3. Use a Screener
![image](https://user-images.githubusercontent.com/60560932/202210339-854e0dfd-cb9c-4414-b2cd-3cc6df2d0ac2.png)
4. See Individual Stock Information
![image](https://user-images.githubusercontent.com/60560932/202210407-1bd11cb8-73eb-42bd-a7c0-a5ba431599e6.png)


## Project Status

- Project is: _in progress_.

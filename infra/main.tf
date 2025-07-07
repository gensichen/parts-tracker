terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.3.0"
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_db_subnet_group" "default" {
  name       = "parts-tracker-db-subnet-group"
  subnet_ids = ["subnet-xxxxxxxx", "subnet-yyyyyyyy"] // Replace with your subnet IDs
}

resource "aws_db_instance" "postgres" {
  identifier              = "parts-tracker-db"
  engine                  = "postgres"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  username                = "postgres"
  password                = "postgrespassword" # Use secrets in production!
  db_subnet_group_name    = aws_db_subnet_group.default.name
  skip_final_snapshot     = true
  publicly_accessible     = false
}

resource "aws_ecs_cluster" "main" {
  name = "parts-tracker-cluster"
}

resource "aws_ecs_task_definition" "api" {
  family                   = "parts-tracker-api"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = "arn:aws:iam::123456789012:role/ecsTaskExecutionRole" # Replace with your role ARN

  container_definitions = jsonencode([
    {
      name      = "parts-tracker-api"
      image     = "your-dockerhub-username/parts-tracker-api:latest" # Replace with your image
      essential = true
      portMappings = [
        {
          containerPort = 8080
          protocol      = "tcp"
        }
      ]
      environment = [
        {
          name  = "ConnectionStrings__Default"
          value = "Host=${aws_db_instance.postgres.address};Database=postgres;Username=postgres;Password=postgrespassword"
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "api" {
  name            = "parts-tracker-api-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = ["subnet-xxxxxxxx", "subnet-yyyyyyyy"] # Replace with your subnet IDs
    assign_public_ip = true
    security_groups = ["sg-xxxxxxxx"] # Replace with your security group ID
  }
}
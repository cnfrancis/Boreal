terraform {
  backend "s3" {
    bucket         = "boreal-tfstate"
    key            = "boreal.tfstate"
    region         = "ca-central-1"
    encrypt        = true
    dynamodb_table = "boreal-tf-state-lock"
  }
}

provider "aws" {
  # Configuration options
  region  = "ca-central-1"
  version = "~>4.32.0" // lock version
}

# ami is the image for the instance
# amazon image -> * is get recent
# data is to retreive information from the cloud provider
data "aws_ami" "amazon_linux" {
  most_recent = true
  filter {
    name   = "name"
    values = ["amzn2-ami-kernel-5.10-hvm-2.0.*-x86_64-gp2"]
  }
  owners = ["amazon"]
}

resource "aws_instance" "http_server" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t2.micro"

  connection {
    type        = "ssh"
    host        = self.public_ip
    user        = "ec2-user"
    private_key = file("./terraform-ec2.pem")
  }
}


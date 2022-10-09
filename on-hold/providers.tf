// don't forget to use variables
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.32.0"
    }
  }
}

provider "aws" {
    # Configuration options
    region = "ca-central-1"
    version = "~>4.32.0" // lock version
}
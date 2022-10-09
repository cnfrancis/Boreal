terraform {
    backend "s3" {
        bucket          = "boreal-tfstate"
        key             = "boreal.tfstate"
        region          = "ca-central-1"
        encrypt         = true
        dynamodb_table  = "boreal-tf-state-lock"
    }
}
import {Lakeformation} from "../lib/index";
import * as cdk from "aws-cdk-lib";

const app = new cdk.App();

const config = {
    catalogID:"5123212",
    DataLocation:"arn:aws:s3:::examplebucket",
    permissionGrant:[""],
    permissions:["SELECT"],
    principalarn:{dataLakePrincipalIdentifier:"arn:aws:s3:::examplebucket"},
    RegisterRoleArn:"arn:aws:iam:321234214::examplebucketrole",
    S3bucket:"arn:aws:s3:::examplebucket"
}

const lf = new Lakeformation(app,"Lakeformation-Stack",config);

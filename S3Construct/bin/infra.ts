import {Lakeformation} from "../lib/S3Construct";
import * as cdk from "aws-cdk-lib";

const app = new cdk.App();
const stack = new cdk.Stack(app,"LFStack");
const config = {
    catalogID:"123445123212",
    DataLocation:"arn:aws:s3:::examplebucket",
    permissionGrant:[""],
    permissions:["SELECT"],
    principalarn:{dataLakePrincipalIdentifier:"arn:aws:s3:::examplebucket"},
    RegisterRoleArn:"arn:aws:iam:321234214::examplebucketrole",
    S3bucket:"arn:aws:s3:::examplebucket"
}

const lf = new Lakeformation(stack,"Lakeformation-Stack",config);

app.synth();
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Lakeformation from '../lib/index';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/index.ts
test('Lakeformation template Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
//   // WHEN
  new Lakeformation.Lakeformation(stack, 'LakeformationConstruct',{catalogID:"5123212",
  DataLocation:{
    catalogId:"5123213",
    resourceArn:"arn:aws:s3:::examplebucket"
  },
  permissionGrant:[""],
  permissions:["SELECT"],
  principalarn:{dataLakePrincipalIdentifier:"arn:aws:s3:::examplebucket"},
  RegisterRoleArn:"arn:aws:iam:321234214::examplebucketrole",
  S3bucket:"arn:aws:s3:::examplebucket"});
//   // THEN
  const template = Template.fromStack(stack);
  console.log(template.toJSON());
});

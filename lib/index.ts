// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lf from 'aws-cdk-lib/aws-lakeformation';s

export interface LakeformationProps {
  // Define construct properties here
  DataSource:String,
  principalarn:String,
  permissions:String,
  database:String,
  table:String

}

export class Lakeformation extends Construct {

  constructor(scope: Construct, id: string, props: LakeformationProps) {
    super(scope, id);

    const resource = new lf.CfnResource(this,'database',{})
    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'LakeformationQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}

import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-S3';

export interface S3Props {
  // Required variables for constructs
}

export class S3 extends Construct {

  constructor(scope: Construct, id: string, props: S3Props) {
    super(scope, id);
    
    // Registering bucket with given role
    const lfresource : lf.CfnResource = new lf.CfnResource(this,'LfResource',{resourceArn:props.S3bucket,
    useServiceLinkedRole: false,
    roleArn:props.RegisterRoleArn});

    // Adding permissions to resource with given IAM role
    const permissions = new lf.CfnPrincipalPermissions(this,'LfPermissions',{
      resource:{
        dataLocation:{catalogId:props.catalogID,resourceArn:props.DataLocation},
        catalog:{catalog:props.catalogID}
        },
      permissions:props.permissions,
      permissionsWithGrantOption:props.permissionGrant,
      principal:props.principalarn,
      catalog:props.catalogID});

    function addDependancy(temp:string) {
      permissions.addDependsOn(lfresource);
    }

  }
}

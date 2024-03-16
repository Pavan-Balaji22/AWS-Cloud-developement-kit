import { Construct } from 'constructs';
import * as lf from 'aws-cdk-lib/aws-lakeformation';

export interface LakeformationProps {
  // Define construct properties here
  DataLocation:lf.CfnPrincipalPermissions.DataLocationResourceProperty,
  principalarn:lf.CfnPrincipalPermissions.DataLakePrincipalProperty,
  permissions:string [],
  permissionGrant:string [],
  resource: lf.CfnPrincipalPermissions.ResourceProperty,
  catalog: string,
  S3bucket: string,
  RegisterRoleArn: string
}

export class Lakeformation extends Construct {

  constructor(scope: Construct, id: string, props: LakeformationProps) {
    super(scope, id);
    
    // Registering bucket with given role
    const lfresource : lf.CfnResource = new lf.CfnResource(this,'LfResource',{resourceArn:props.S3bucket,
    useServiceLinkedRole: false,
    roleArn:props.RegisterRoleArn});

    // Adding permissions to resource with given IAM role
    const permissions = new lf.CfnPrincipalPermissions(this,'LfPermissions',{
      resource:props.resource,
      permissions:props.permissions,
      permissionsWithGrantOption:props.permissionGrant,
      principal:props.principalarn,
      catalog:props.catalog});

    function addDependancy(temp:string) {
      permissions.addDependsOn(lfresource);
    }

  }
}

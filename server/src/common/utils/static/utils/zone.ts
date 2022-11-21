import qiniu from "qiniu";
let zone = {
  huadong: qiniu.zone.Zone_z0,
  huabei: qiniu.zone.Zone_z1,
  huanan: qiniu.zone.Zone_z2,
};
export default zone[process.env.OSS_ZONE];

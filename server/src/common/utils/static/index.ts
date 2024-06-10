// import deleteFile from "./qiniu/deleteFile";
// import exist from "./qiniu/exist";
// import listPrefix from "./qiniu/listPrefix";
// import refreshUrls from "./qiniu/refreshUrls";
// import imageInfo from "./qiniu/imageInfo";
// import upload from "./qiniu/upload";

// import listPrefix from "./ali/listPrefix";
// import upload from "./ali/upload";
// import deleteFile from "./ali/deleteFile";
// import imageInfo from "./ali/imageInfo";
// import exist from "./ali/exist";
// import refreshUrls from "./ali/refreshUrls";

// export { deleteFile, exist, listPrefix, refreshUrls, upload, imageInfo };


// 阿里云模块
import aliDeleteFile from './ali/deleteFile';
import aliExist from './ali/exist';
import aliListPrefix from './ali/listPrefix';
import aliRefreshUrls from './ali/refreshUrls';
import aliImageInfo from './ali/imageInfo';
import aliUpload from './ali/upload';

// 七牛模块
import qiniuDeleteFile from './qiniu/deleteFile';
import qiniuExist from './qiniu/exist';
import qiniuListPrefix from './qiniu/listPrefix';
import qiniuRefreshUrls from './qiniu/refreshUrls';
import qiniuImageInfo from './qiniu/imageInfo';
import qiniuUpload from './qiniu/upload';

// 创建两个对象来存储模块
const ali = {
  deleteFile: aliDeleteFile,
  exist: aliExist,
  listPrefix: aliListPrefix,
  refreshUrls: aliRefreshUrls,
  imageInfo: aliImageInfo,
  upload: aliUpload
};

const qiniu = {
  deleteFile: qiniuDeleteFile,
  exist: qiniuExist,
  listPrefix: qiniuListPrefix,
  refreshUrls: qiniuRefreshUrls,
  imageInfo: qiniuImageInfo,
  upload: qiniuUpload
};

// 根据环境变量选择导出哪个对象
const modules = process.env.CLIENT_HOST == 'ali' ? ali : qiniu;

export const {
  deleteFile,
  exist,
  listPrefix,
  refreshUrls,
  imageInfo,
  upload
} = modules;

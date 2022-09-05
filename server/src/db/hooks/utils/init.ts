function init<T = any, J = any>(callback: (modal: J, type: "create" | "update" | "delete") => any) {
  return {
    beforeBulkCreate(options: any) {
      options.individualHooks = true;
      return options;
    },
    afterCreate(instance: T, options: any) {
      if (options.transaction) {
        options.transaction?.afterCommit(() => {
          callback((instance as any).dataValues as unknown as J, "create");
        });
      } else {
        callback((instance as any).dataValues as unknown as J, "create");
      }
    },
    beforeBulkUpdate(options: any) {
      options.individualHooks = true;
      return options;
    },
    afterUpdate(instance: T, options: any) {
      if (options.transaction) {
        options.transaction?.afterCommit(() => {
          callback((instance as any).dataValues as unknown as J, "update");
        });
      } else {
        callback((instance as any).dataValues as unknown as J, "update");
      }
    },
    beforeBulkDestroy(options: any) {
      options.individualHooks = true;
      return options;
    },
    afterDestroy(instance: T, options: any) {
      if (options.transaction) {
        options.transaction?.afterCommit(() => {
          callback((instance as any).dataValues as unknown as J, "delete");
        });
      } else {
        callback((instance as any).dataValues as unknown as J, "delete");
      }
    },
  } as any;
}
export default init;

import { Icon } from "@iconify/react";

import pageNoticeStyles from "./PageNotice.module.css";

import config from "config";

const PageNotice = ({ children }) => (
  <div className={pageNoticeStyles.container}>{children}</div>
);

const Builder = () => (
  <PageNotice>
    <p className={pageNoticeStyles.content}>
      <span>Got a cool idea?</span>
      <a
        href={config.TYPEFORM_BUILDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={pageNoticeStyles.link}
      >
        <Icon icon="la:hand-peace" width="1.35em" />
        <span>Build with Vana</span>
      </a>
    </p>
  </PageNotice>
);

PageNotice.Builder = Builder;

export { PageNotice };

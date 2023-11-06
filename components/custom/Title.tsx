import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface TitleProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const Title: React.FC<TitleProps> = ({ onClick }) => (
  <motion.svg
    onClick={onClick}
    className="cursor-pointer"
    width="227"
    height="38"
    viewBox="0 0 227 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M33.1353 18.7862C33.1353 22.6688 32.4251 26.0068 31.0046 28.8004C29.5842 31.5821 27.637 33.7246 25.163 35.228C22.7009 36.7194 19.9014 37.4652 16.7646 37.4652C13.6159 37.4652 10.8046 36.7194 8.33062 35.228C5.8685 33.7246 3.92721 31.5762 2.50675 28.7826C1.0863 25.9891 0.376071 22.6569 0.376071 18.7862C0.376071 14.9036 1.0863 11.5715 2.50675 8.78974C3.92721 5.99618 5.8685 3.85366 8.33062 2.36219C10.8046 0.85887 13.6159 0.107213 16.7646 0.107213C19.9014 0.107213 22.7009 0.85887 25.163 2.36219C27.637 3.85366 29.5842 5.99618 31.0046 8.78974C32.4251 11.5715 33.1353 14.9036 33.1353 18.7862ZM27.7021 18.7862C27.7021 15.8269 27.2227 13.3352 26.2639 11.311C25.3169 9.27506 24.0148 7.73624 22.3576 6.69457C20.7122 5.64107 18.8479 5.11432 16.7646 5.11432C14.6694 5.11432 12.7991 5.64107 11.1538 6.69457C9.50841 7.73624 8.20633 9.27506 7.24752 11.311C6.30055 13.3352 5.82707 15.8269 5.82707 18.7862C5.82707 21.7455 6.30055 24.2431 7.24752 26.2791C8.20633 28.3032 9.50841 29.8421 11.1538 30.8956C12.7991 31.9372 14.6694 32.4581 16.7646 32.4581C18.8479 32.4581 20.7122 31.9372 22.3576 30.8956C24.0148 29.8421 25.3169 28.3032 26.2639 26.2791C27.2227 24.2431 27.7021 21.7455 27.7021 18.7862ZM44.8585 20.7748V36.968H39.5495V9.69528H44.6454V14.1342H44.9828C45.6102 12.6901 46.5926 11.53 47.9302 10.6541C49.2797 9.77814 50.9783 9.34017 53.0261 9.34017C54.8845 9.34017 56.5121 9.73079 57.9089 10.512C59.3057 11.2815 60.3888 12.4297 61.1582 13.9566C61.9276 15.4836 62.3123 17.3717 62.3123 19.6207V36.968H57.0034V20.2599C57.0034 18.2831 56.4885 16.7384 55.4586 15.6257C54.4288 14.5012 53.0143 13.9389 51.215 13.9389C49.984 13.9389 48.889 14.2052 47.9302 14.7379C46.9833 15.2706 46.2316 16.0518 45.6753 17.0816C45.1307 18.0996 44.8585 19.3307 44.8585 20.7748Z"
      fill="black"
    />
    <path
      d="M82.8343 36.968L72.4295 0.604373H80.828L86.8471 25.8707H87.149L93.7896 0.604373H100.981L107.604 25.924H107.923L113.942 0.604373H122.341L111.936 36.968H104.443L97.5183 13.1932H97.2342L90.3272 36.968H82.8343ZM131.161 37.4829C129.421 37.4829 127.87 37.1811 126.509 36.5774C125.148 35.9619 124.07 35.0563 123.277 33.8608C122.496 32.6534 122.105 31.1501 122.105 29.3508C122.105 27.8357 122.384 26.5632 122.94 25.5334C123.496 24.5035 124.254 23.6749 125.213 23.0476C126.172 22.4202 127.261 21.9467 128.48 21.6271C129.711 21.3075 131.001 21.0826 132.351 20.9524C133.937 20.7867 135.215 20.6328 136.186 20.4907C137.156 20.3369 137.861 20.1119 138.299 19.816C138.737 19.5201 138.956 19.0821 138.956 18.5021V18.3956C138.956 17.271 138.601 16.401 137.89 15.7855C137.192 15.17 136.198 14.8622 134.907 14.8622C133.546 14.8622 132.463 15.164 131.658 15.7677C130.853 16.3596 130.32 17.1053 130.06 18.0049L123.064 17.4368C123.419 15.7796 124.118 14.3473 125.159 13.1399C126.201 11.9207 127.545 10.9855 129.19 10.3345C130.847 9.67161 132.765 9.34017 134.943 9.34017C136.458 9.34017 137.908 9.51773 139.293 9.87284C140.69 10.228 141.927 10.7784 143.004 11.5241C144.093 12.2699 144.951 13.2287 145.578 14.4005C146.206 15.5606 146.52 16.9514 146.52 18.5731V36.968H139.346V33.186H139.133C138.695 34.0383 138.109 34.79 137.375 35.441C136.641 36.0802 135.76 36.5833 134.73 36.9503C133.7 37.3054 132.51 37.4829 131.161 37.4829ZM133.327 32.2628C134.44 32.2628 135.422 32.0438 136.275 31.6058C137.127 31.156 137.796 30.5523 138.281 29.7947C138.766 29.0371 139.009 28.1789 139.009 27.2201V24.326C138.772 24.4798 138.447 24.6219 138.032 24.7521C137.63 24.8705 137.174 24.9829 136.665 25.0895C136.156 25.1842 135.647 25.2729 135.138 25.3558C134.629 25.4268 134.168 25.4919 133.753 25.5511C132.865 25.6813 132.09 25.8885 131.427 26.1726C130.764 26.4566 130.249 26.8414 129.882 27.3267C129.516 27.8002 129.332 28.392 129.332 29.1022C129.332 30.1321 129.705 30.9192 130.451 31.4637C131.208 31.9964 132.167 32.2628 133.327 32.2628ZM166.894 9.69528V15.3771H150.47V9.69528H166.894ZM154.199 3.16119H161.763V28.5873C161.763 29.2857 161.869 29.8302 162.082 30.2209C162.295 30.5996 162.591 30.866 162.97 31.0199C163.361 31.1737 163.811 31.2507 164.32 31.2507C164.675 31.2507 165.03 31.2211 165.385 31.1619C165.74 31.0909 166.012 31.0376 166.202 31.0021L167.391 36.6307C167.013 36.749 166.48 36.8852 165.793 37.039C165.107 37.2048 164.272 37.3054 163.29 37.3409C161.467 37.4119 159.869 37.1692 158.496 36.6129C157.134 36.0566 156.075 35.1924 155.317 34.0206C154.56 32.8487 154.187 31.3691 154.199 29.5816V3.16119ZM183.851 37.5007C181.057 37.5007 178.654 36.9088 176.642 35.7251C174.642 34.5296 173.103 32.8724 172.026 30.7535C170.96 28.6347 170.428 26.1962 170.428 23.4382C170.428 20.6446 170.966 18.1943 172.043 16.0873C173.132 13.9685 174.677 12.3172 176.678 11.1335C178.678 9.93794 181.057 9.34017 183.815 9.34017C186.195 9.34017 188.278 9.77222 190.065 10.6363C191.853 11.5004 193.267 12.7137 194.309 14.2762C195.351 15.8387 195.925 17.6735 196.031 19.7805H188.893C188.692 18.4192 188.16 17.3243 187.295 16.4957C186.443 15.6553 185.325 15.2351 183.94 15.2351C182.768 15.2351 181.744 15.5547 180.868 16.1939C180.004 16.8212 179.329 17.7386 178.844 18.946C178.358 20.1534 178.116 21.6153 178.116 23.3316C178.116 25.0717 178.353 26.5513 178.826 27.7706C179.311 28.9898 179.992 29.919 180.868 30.5582C181.744 31.1974 182.768 31.517 183.94 31.517C184.804 31.517 185.579 31.3395 186.266 30.9843C186.964 30.6292 187.538 30.1143 187.988 29.4396C188.45 28.753 188.751 27.9304 188.893 26.9716H196.031C195.913 29.0549 195.345 30.8896 194.327 32.4758C193.321 34.0502 191.93 35.2812 190.154 36.169C188.379 37.0568 186.277 37.5007 183.851 37.5007ZM208.438 21.201V36.968H200.874V0.604373H208.225V14.5071H208.545C209.16 12.8972 210.154 11.6366 211.528 10.7251C212.901 9.80182 214.623 9.34017 216.694 9.34017C218.588 9.34017 220.24 9.75447 221.648 10.5831C223.069 11.3998 224.17 12.5776 224.951 14.1164C225.744 15.6434 226.135 17.4723 226.123 19.603V36.968H218.559V20.9524C218.571 19.2715 218.144 17.9635 217.28 17.0284C216.428 16.0932 215.233 15.6257 213.694 15.6257C212.664 15.6257 211.752 15.8447 210.959 16.2826C210.178 16.7206 209.563 17.3598 209.113 18.2003C208.675 19.0289 208.45 20.0291 208.438 21.201Z"
      fill="#EC1D37"
    />
  </motion.svg>
);

export default Title;

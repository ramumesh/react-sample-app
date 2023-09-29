import styles from "./AppButton.module.css";

const AppButton = ({ title, ...rest }) => {
    return <button {...rest} className={styles.appButton}>{title}</button>;
};

export default AppButton;
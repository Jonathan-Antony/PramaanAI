import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './AppShell.module.scss';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.appShell}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

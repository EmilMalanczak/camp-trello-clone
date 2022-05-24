import { Drawer, Divider, Text, ScrollArea } from '@mantine/core'
import { FaUser } from 'react-icons/fa'
import { UserDTO } from 'shared'
import Description from '../Description/Description'
import MembersList from '../MembersList/MembersList'
import convertDate from '../../utils/convertDate'
import UserType from '../../types/user'
import useStyles from './style'
import UserIcon from '../UserIcon/UserIcon'

type DashboardDrawerProps = {
  title: string
  description: string
  creationDate: Date
  membersList: UserDTO[]
  isAdmin: boolean
  isOpen: boolean
  setIsOpen: () => void
  onDescriptionSaveHandler: (descriptionText: string) => void
  onUserRemoveHandler: (id: string) => void
}

const DashboardDrawer = ({
  title,
  description,
  creationDate,
  membersList,
  isAdmin,
  isOpen,
  setIsOpen,
  onDescriptionSaveHandler,
  onUserRemoveHandler
}: DashboardDrawerProps) => {
  const { classes } = useStyles()
  // TODO: roles
  // const dashboardAuthor = membersList.filter((member: UserDTO) => member.role === 'Admin')[0]
  const dashboardAuthor = membersList[0]
  const parsedDate = convertDate(creationDate)

  return (
    <Drawer
      opened={isOpen}
      onClose={setIsOpen}
      position="right"
      size="xl"
      padding="xl"
      title={title}
      classNames={{ drawer: classes.drawer, header: classes.drawerHeader }}
    >
      <Divider className={classes.divider} />
      <ScrollArea style={{ height: 'calc(100vh - 70px)' }} className={classes.scrollArea}>
        <header className={classes.authorHeader}>
          <FaUser className={classes.title} />
          <Text className={classes.title}>Made by</Text>
        </header>

        <section className={classes.authorSection}>
          <UserIcon username={dashboardAuthor.username} imgUrl={dashboardAuthor.avatarUrl} />
          <div className={classes.authorInfo}>
            {dashboardAuthor.username}
            <p className={classes.date}>{`on ${parsedDate}`}</p>
          </div>
        </section>

        <Description
          initialText={description}
          onTextSavedHandler={
            (descriptionText: string) => onDescriptionSaveHandler(descriptionText)
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />

        <MembersList
          title="Teams"
          membersList={membersList}
          onDeleteHandler={onUserRemoveHandler}
          isDeletable={isAdmin}
        />
      </ScrollArea>
    </Drawer>
  )
}

export default DashboardDrawer

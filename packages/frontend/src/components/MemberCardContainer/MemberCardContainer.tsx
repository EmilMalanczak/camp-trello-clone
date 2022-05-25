import { useState } from 'react'
import { UserDTO } from 'shared'
import { Button, Input, Text, ActionIcon, Center, UnstyledButton } from '@mantine/core'
import { AiOutlineSearch } from 'react-icons/ai'
import useStyles from './style'
import UserIcon from '../UserIcon/UserIcon'

type MemberCardContainerProps = {
  membersList: UserDTO[]
  addUserHandler: (selectedUsers: string[]) => void
}

const MemberCardContainer = ({ membersList, addUserHandler }: MemberCardContainerProps) => {
  const { classes } = useStyles()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const usersSearchResult = !searchTerm
    ? membersList
    : membersList.filter(({ username }) =>
        username.toLowerCase().includes(searchTerm.toLowerCase())
      )

  function handleMemberClick(id: string) {
    const userIndex = selectedUsers.indexOf(id)

    if (userIndex > -1) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((prevUserId) => prevUserId !== id)
      )
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, id])
    }
  }

  return (
    <div className={classes.memberCard}>
      <Text className={classes.memberCardTitle}>Members</Text>
      <Text className={classes.memberCardDescription}>Assign members to this card</Text>
      <Input
        className={classes.memberCardInput}
        placeholder="User..."
        radius="md"
        rightSectionWidth={30}
        value={searchTerm}
        onChange={handleChange}
        rightSection={
          <ActionIcon radius="md" variant="filled" color="blue" className={classes.icon}>
            <AiOutlineSearch />
          </ActionIcon>
        }
      />
      <section className={classes.usersContainer}>
        {usersSearchResult.slice(0, 4).map(({ username, avatarUrl, id }) => (
          <UnstyledButton
            className={
              selectedUsers.indexOf(id) + 1
                ? `${classes.memberContainer} ${classes.selectedUser}`
                : classes.memberContainer
            }
            key={id}
            onClick={() => handleMemberClick(id)}
          >
            <UserIcon imgUrl={avatarUrl} username={username} />
            <Text className={classes.user} weight={600}>
              {username}
            </Text>
          </UnstyledButton>
        ))}
      </section>
      <Center>
        <Button
          radius="md"
          onClick={() => {
            addUserHandler(selectedUsers)
            setSelectedUsers([])
          }}
        >
          Invite
        </Button>
      </Center>
    </div>
  )
}
export default MemberCardContainer

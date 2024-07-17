import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import useSWR from 'swr';
import {getTasksRequest} from '../api/getTasksRequest';
import {addTaskRequest} from '../api/addTaskRequest';
import {updatedTaskRequest} from '../api/updatedTaskRequest';
import {deleteTaskRequest} from '../api/deleteTaskRequest';

const HomeScreen: FC = () => {
  const {data, mutate} = useSWR('/task', getTasksRequest);
  const [addModal, setAddModal] = useState<{
    name: string;
    description: string;
    status: string;
    isVisible: boolean;
    type: 'add' | 'update';
    id: number | null;
  }>({
    name: '',
    description: '',
    status: '',
    isVisible: false,
    type: 'add',
    id: null,
  });
  const callBack = async () => {
    await mutate();
    setAddModal({
      name: '',
      description: '',
      status: '',
      isVisible: false,
      type: 'add',
      id: null,
    });
  };
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <View style={styles.task}>
            <Text style={styles.taskText}>Taks name: {item.name}</Text>
            <Text style={styles.taskText}>Description: {item.description}</Text>
            <Text style={styles.taskText}>Status: {item.status}</Text>
            <View style={styles.buttonsView}>
              <Pressable
                style={styles.button}
                onPress={() =>
                  setAddModal({
                    name: item.name,
                    description: item.description,
                    status: item.status,
                    isVisible: true,
                    type: 'update',
                    id: item._id,
                  })
                }>
                <Text style={styles.taskText}>Edit</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => deleteTaskRequest(item._id, mutate)}>
                <Text style={styles.taskText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
      <Pressable
        style={styles.addButton}
        onPress={() =>
          setAddModal({
            name: '',
            description: '',
            status: '',
            isVisible: true,
            type: 'add',
            id: null,
          })
        }>
        <Text style={styles.plusIcon}>+</Text>
      </Pressable>
      <Modal visible={addModal.isVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.inputTitle}>Taks name</Text>
            <TextInput
              style={styles.input}
              onChangeText={text =>
                setAddModal(prev => ({...prev, name: text}))
              }
              value={addModal.name}
            />
            <Text style={styles.inputTitle}>Description</Text>
            <TextInput
              style={styles.input}
              onChangeText={text =>
                setAddModal(prev => ({...prev, description: text}))
              }
              value={addModal.description}
            />
            <View style={styles.buttonsView}>
              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      addModal.status === 'In progress' ? 'gray' : 'white',
                  },
                ]}
                onPress={() =>
                  setAddModal(prev => ({...prev, status: 'In progress'}))
                }>
                <Text style={styles.taskText}>In Progress</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      addModal.status === 'Done' ? 'gray' : 'white',
                  },
                ]}
                onPress={() =>
                  setAddModal(prev => ({...prev, status: 'Done'}))
                }>
                <Text style={styles.taskText}>Done</Text>
              </Pressable>
            </View>
            <View style={styles.buttonsView}>
              <Pressable
                style={styles.addTaskButton}
                onPress={() => {
                  const request =
                    addModal.type === 'add'
                      ? addTaskRequest
                      : updatedTaskRequest;
                  request(
                    {
                      name: addModal.name,
                      description: addModal.description,
                      status: addModal.status,
                    },
                    callBack,
                    addModal.id,
                  );
                }}>
                <Text style={styles.buttonText}>{true ? 'Add' : 'Update'}</Text>
              </Pressable>
              <Pressable
                style={styles.addTaskButton}
                onPress={() =>
                  setAddModal({
                    name: '',
                    description: '',
                    status: '',
                    isVisible: false,
                    type: 'add',
                    id: null,
                  })
                }>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  task: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 16,
  },
  list: {
    paddingVertical: 16,
  },
  taskText: {
    fontSize: 18,
    color: 'black',
  },
  buttonsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    width: '40%',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 48,
    fontWeight: '400',
    color: 'white',
  },
  addButton: {
    height: Dimensions.get('window').height * 0.07,
    width: Dimensions.get('window').height * 0.07,
    borderRadius: (Dimensions.get('window').height * 0.07) / 2,
    backgroundColor: 'skyblue',
    position: 'absolute',
    bottom: 48,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: Dimensions.get('window').height * 0.06,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    marginBottom: 16,
    color: 'black',
    paddingHorizontal: 8,
    fontSize: 16,
  },
  inputTitle: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    width: '100%',
  },
  addTaskButton: {
    width: '48%',
    height: Dimensions.get('window').height * 0.06,
    borderRadius: 6,
    backgroundColor: 'white',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 16,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
});

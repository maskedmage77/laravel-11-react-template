import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';

interface Props { 
    objectName: string,
    onConfirm: () => any 
}

export default function deleteConfirmationModal({ objectName, onConfirm } : Props) {
  modals.openConfirmModal({
    title: 'Confirm Deletion - ' + objectName,
    centered: true,
    children: (
      <Text size="sm">
        Please confirm that you would like to delete this. This action is irreversible.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    confirmProps: { color: "red" },
    onConfirm: onConfirm,
  });
}

 
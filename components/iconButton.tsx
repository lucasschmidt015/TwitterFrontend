import { Text, View } from '@/components/Themed';
import { EvilIcons } from '@expo/vector-icons';

type IconButtonProps ={
    iconName: React.ComponentProps<typeof EvilIcons>['name'];
    textContent?: String | number;
}
  
  const IconButton = ({ iconName, textContent }: IconButtonProps) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <EvilIcons name={iconName} size={22} color="gray"/>
        <Text style={{ fontSize: 12, color: 'gray' }}>{textContent}</Text>
      </View>
    );
  }


  export default IconButton;
import { catApi } from "@/api/catApi";
import Link from "next/link";
import {
  Container,
  Grid,
  GridCol,
  Image,
  Text,
  Badge,
  Group,
  Stack,
  Button,
  Paper,
  Center,
  Divider,
  Box,
} from "@mantine/core";

export default async function BreedDetailPage({
  params,
}: {
  params: Promise<{ breedDetail: string }>;
}) {
  const { breedDetail: breed_id } = await params;

  try {
    const breedData = await catApi.fetchBreedDetail(breed_id);
    if (!breedData)
      return (
        <Center h={400}>
          <Text>找不到该品种信息</Text>
        </Center>
      );

    let imageUrl = "";
    if (breedData.reference_image_id) {
      const imageRes = await catApi.fetchImagesByBreed(
        breedData.reference_image_id,
      );
      imageUrl = imageRes.url;
    }

    return (
      <Container size="lg" py="xl">
        <Paper shadow="md" radius="lg" p="xl" withBorder>
          <Grid gutter={40}>
            {/* 修正 1: GridCol 替代 Grid.Col */}
            <GridCol span={{ base: 12, md: 5 }}>
              <Image
                src={imageUrl}
                alt={breedData.name}
                radius="md"
                h={500}
                fallbackSrc="https://placehold.co/600x400?text=暂无照片"
              />
            </GridCol>

            <GridCol span={{ base: 12, md: 7 }}>
              <Stack gap="md">
                {/* 修正 2: Title 不支持 gradient，改用 Text 模拟 h1 */}
                <Text
                  component="h1"
                  size="3rem"
                  fw={900}
                  variant="gradient"
                  gradient={{ from: "pink", to: "orange" }}
                  style={{ lineHeight: 1.2, margin: 0 }}
                >
                  {breedData.name}
                </Text>

                {/* 修正 3: 解决 image_f2e88e.jpg 的 Hydration Error */}
                {/* <Text> 默认是 <p>，内部不能放 <Badge> (它是 <div>)。改用 Box 替代 */}
                <Box>
                  <Group gap="xs">
                    <Text size="sm" c="dimmed">
                      原产地:
                    </Text>
                    <Badge variant="outline" color="gray">
                      {breedData.origin}
                    </Badge>
                  </Group>
                </Box>

                <Text size="md" style={{ lineHeight: 1.6 }}>
                  {breedData.description}
                </Text>

                <Divider my="sm" label="详细特征" labelPosition="center" />

                <Stack gap="xs">
                  <Text size="sm">
                    <b>性格:</b> {breedData.temperament}
                  </Text>
                  <Text size="sm">
                    <b>平均寿命:</b> {breedData.life_span} 年
                  </Text>

                  <Text size="sm">
                    <b>适应能力:</b> ({breedData.adaptability} / 5)
                  </Text>
                </Stack>
              </Stack>
            </GridCol>
          </Grid>
        </Paper>

        <Center mt={40}>
          {/* 修正 4: 解决 image_f2e909.png 错误 */}
          {/* 在 Server Component 中，不能直接将 Link 组件传递给 component 属性 */}
          {/* 改为直接使用 Link 包装 Button，或者直接使用 Link 加上样式 */}
          <Link href="/breeds" style={{ textDecoration: "none" }}>
            <Button
              loaderProps={{ type: "dots" }}
              color="pink.5"
              size="lg"
              radius="xl"
              variant="filled"
              style={{
                transition: "all 0.2s ease",
              }}
              styles={{
                root: {
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              返回品种列表
            </Button>
          </Link>
        </Center>
      </Container>
    );
  } catch (error) {
    return (
      <Center h={400}>
        <Text c="red">加载失败，请检查品种 ID</Text>
      </Center>
    );
  }
}

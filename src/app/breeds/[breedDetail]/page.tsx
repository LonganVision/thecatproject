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
  Progress,
} from "@mantine/core";
import styles from "./BreedDetail.module.css";

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
          <Text fw={700}>找不到该品种信息 😿</Text>
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
      <Container size="lg" p={0} pt={10} pb="xl">
        <Paper
          shadow="md"
          radius="lg"
          p="xl"
          withBorder
          className={styles.detailPaper}
        >
          <Grid gutter={40} align="stretch">
            {/* 左侧图片 */}
            <GridCol span={{ base: 12, md: 5 }}>
              <Image
                src={imageUrl}
                alt={breedData.name}
                radius="md"
                h={{ base: 300, md: 550 }}
                fit="cover"
                fallbackSrc="https://placehold.co/600x400?text=暂无照片"
              />
            </GridCol>

            {/* 右侧详情 */}
            <GridCol span={{ base: 12, md: 7 }}>
              <Stack gap="lg">
                <Box>
                  <Text
                    component="h1"
                    size="3.5rem"
                    fw={900}
                    variant="gradient"
                    gradient={{ from: "orange.5", to: "pink.5" }}
                    style={{
                      lineHeight: 1.1,
                      margin: 0,
                      letterSpacing: "-1px",
                    }}
                  >
                    {breedData.name}
                  </Text>
                  <Group gap="xs" mt="xs">
                    <Badge variant="dot" color="orange" size="lg">
                      原产地: {breedData.origin}
                    </Badge>
                    <Badge variant="outline" color="pink" size="lg">
                      寿命: {breedData.life_span} 年
                    </Badge>
                  </Group>
                </Box>

                <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                  {breedData.description}
                </Text>

                <Divider label="性格特征" labelPosition="center" />

                <Group gap="xs">
                  {breedData.temperament?.split(",").map((t: string) => (
                    <Badge
                      key={t}
                      variant="light"
                      color="orange.2"
                      radius="sm"
                      c="orange.9"
                    >
                      {t.trim()}
                    </Badge>
                  ))}
                </Group>

                <Divider label="能力评分" labelPosition="center" />

                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" fw={700}>
                      适应能力
                    </Text>
                    <Text size="sm" c="orange.6" fw={700}>
                      {breedData.adaptability} / 5
                    </Text>
                  </Group>
                  <Progress
                    value={(breedData.adaptability / 5) * 100}
                    color="orange.5"
                    size="sm"
                    radius="xl"
                  />
                </Stack>
              </Stack>
            </GridCol>
          </Grid>
        </Paper>

        <Center mt={50}>
          <Link href="/breeds" style={{ textDecoration: "none" }}>
            <Button className={styles.backButton} size="lg" radius="xl">
              返回品种列表
            </Button>
          </Link>
        </Center>
      </Container>
    );
  } catch (error) {
    return (
      <Center h={400}>
        <Text c="red">加载失败</Text>
      </Center>
    );
  }
}
